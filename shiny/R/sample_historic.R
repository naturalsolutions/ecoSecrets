library(tidyverse)
library(lubridate)
library(data.table)

sample_historic <- function(df,
                            start_date,
                            end_date,
                            display = TRUE,
                            species = NULL) {
  
  # Conversion des dates
  start_date <- as.Date(start_date, format = "%d/%m/%Y")
  end_date <- as.Date(end_date, format = "%d/%m/%Y")
  
  # S'assurer que la colonne 'date' est au format Date
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  # Garder un jour unique par deployment (on ne veut pas compter plusieurs obs le même jour)
  dt <- as.data.table(df[, c("deployment", "date")])
  dt <- unique(dt)  # supprime les doublons (ex : 3 obs le même jour)
  
  # Ajout des colonnes utiles
  dt[, jour := as.Date(date)]
  dt[, jour_num := as.integer(jour)]
  setorder(dt, deployment, jour)
  dt[, diff := jour_num - shift(jour_num, fill = jour_num[1]), by = .(deployment)]
  dt[, grp := cumsum(diff != 1), by = .(deployment)]
  
  # Calcul des plages de jours consécutifs
  plages <- dt[, .(start = min(jour), end = max(jour)), by = .(deployment, grp)]
  
  # Suppression de l'ajout d'un jour si end == start
  # plages[, end := ifelse(start == end, end + 1, end)]
  
  # Graphique
  p <- ggplot(plages, aes(y = deployment)) +
    geom_segment(aes(x = start, xend = end, yend = deployment),
                 size = 5, color = "grey") +
    labs(
      title = paste0("Périodes d'activité des pièges (espèce : ", species, ")"),
      x = "Date", y = "Déploiement"
    ) +
    theme_minimal() +
    theme(axis.text.y = element_text(size = 8))
  
  # Ajouter les observations en rouge si espèce présente
  if (display) {
    observations <- df %>%
      filter(species %in% !!species) %>%
      mutate(jour = as.Date(date)) %>%
      select(deployment, jour) %>%
      distinct()
    
    if (nrow(observations) > 0) {
      p <- p + geom_point(data = observations,
                          aes(x = jour, y = deployment),
                          color = "red", size = 2, shape = 3)
    }
  }
  return(p)
}
