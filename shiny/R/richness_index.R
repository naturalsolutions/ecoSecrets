library(tidyr)
library(ggplot2)
library(vegan)
library(rlang)

richness_index <- function(df, taxon, richness_index) {
  taxon <- sym(taxon)
  
  # Sélection des colonnes nécessaires
  df <- df %>%
    select(number, !!taxon) %>%
    filter(
      !is.na(!!taxon), !!taxon != "",
      !is.na(number), number != ""
    )
  
  species <- df %>%
    pull(!!taxon) %>%
    unique()
  
  # Largeur pour avoir une ligne par espèce avec somme des nombres
  df_wide <- df %>%
    pivot_wider(
      names_from = !!taxon,
      values_from = number,
      values_fn = sum,
      values_fill = 0
    )
  
  # Retirer la colonne number s'il y en a encore et garder que les espèces
  # Si df_wide contient d'autres colonnes, on peut les enlever, sinon on garde tout sauf number
  # Ici on suppose que pivot_wider a donné une ligne unique avec colonnes espèces
  df_matrix <- df_wide %>%
    select(all_of(species))
  
  # Calcul de la diversité globale (sur tout le dataframe)
  div_value <- diversity(df_matrix, index = richness_index)
  
  df_div <- data.frame(
    label = "Diversité globale",
    diversity = div_value
  )
  
  # Plot
  ggplot(df_div, aes(x = label, y = diversity)) +
    geom_bar(stat = "identity", fill = "steelblue") +
    labs(title = paste("Indice de diversité (", richness_index, ") global", sep = ""),
         x = "",
         y = paste("Indice de diversité -", richness_index)) +
    theme_minimal()
}
