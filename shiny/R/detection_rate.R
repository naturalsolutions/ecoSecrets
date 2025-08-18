library(dplyr)
library(lubridate)


detection_rate <- function(df, selected_species, start_date, end_date, interval_ind =5, show_by="project") {
  show_by <- sym(show_by)
  
  # Prétraitement des dates
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  # Filtrage optionnel par espèce
  if (!is.null(selected_species)) {
    df <- df %>% filter(species %in% selected_species)
  }
  
  # Si aucune ligne après filtrage
  if (nrow(df) == 0) {
    cat("Aucune donnée après filtrage. Vérifiez les paramètres.\n")
    return(NULL)
  }
  
  # Liste des espèces à traiter
  species_list <- unique(df$species)
  
  # Initialiser un tableau pour stocker les résultats
  results <- data.frame(
    espece = character(),
    n_events = integer(),
    trap_days = integer(),
    detection_rate = numeric(),
    stringsAsFactors = FALSE
  )
  
  for (sp in species_list) {
    df_sp <- df %>% filter(species == sp)
    
    # Identifier les événements indépendants
    df_indep <- df_sp %>%
      arrange(date) %>%
      group_by(deployment) %>%
      mutate(diff_time = as.numeric(difftime(date, lag(date), units = "mins")),
             new_event = is.na(diff_time) | diff_time > interval_ind,
             event_id = cumsum(new_event)) %>%
      ungroup()
    
    # Nombre total d'événements indépendants
    n_events_df <- df_indep %>%
      distinct(deployment, event_id, !!show_by) %>%
      group_by(!!show_by) %>%
      summarise(n_events=n()) %>%
      ungroup()
    
    # Nombre de jours-trap actifs
    trap_days <- as.numeric(difftime(end_date, start_date, units = "days")) + 1
    
    n_events_df <- n_events_df %>%
      mutate(espece = sp,
      trap_days = trap_days,
      detection_rate = round(n_events/trap_days, 4))
    
    results <- rbind(results, n_events_df)
  }
  
  # Création du graphique
  plot <- ggplot(results, aes(x = detection_rate, y = reorder(espece, detection_rate))) +
    geom_point(color = "steelblue", size = 3) +
    labs(title = "Taux de détection par espèce",
         x = "Taux de détection",
         y = "Espèce") +
    theme_minimal() +
    facet_wrap(vars(!!show_by))
  
  print(plot)
}