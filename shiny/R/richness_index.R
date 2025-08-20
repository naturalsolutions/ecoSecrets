library(dplyr)
library(tidyr)
library(ggplot2)
library(vegan)
library(lubridate)
library(rlang)

source("R/translate.R")

richness_index <- function(df, start_date = NULL, end_date = NULL, taxon_res, time_res, richness_index, show_by) {
  taxon_res <- sym(taxon_res)
  show_by <- sym(show_by)
  
  # Convertir la colonne date en POSIXct si nécessaire
  df <- df %>%
    mutate(date = as.POSIXct(date, format = "%Y-%m-%d %H:%M:%S"))
  
  # Filtrer les dates
  if (!is.null(start_date)) {
    start_date <- as.POSIXct(start_date, format = "%d/%m/%Y %H:%M:%S")
    df <- df %>% filter(date >= start_date)
  }
  if (!is.null(end_date)) {
    end_date <- as.POSIXct(end_date, format = "%d/%m/%Y %H:%M:%S")
    df <- df %>% filter(date <= end_date)
  }
  
  # Nettoyer et regrouper
  df_wide <- df %>%
    filter(
      !is.na(!!taxon_res), !!taxon_res != "",
      !is.na(number), number != ""
    ) %>%
    mutate(time_group = floor_date(date, unit = time_res)) %>%
    group_by(time_group, !!show_by, !!taxon_res) %>%
    summarise(number = sum(number, na.rm = TRUE), .groups = "drop") %>%
    pivot_wider(names_from = !!taxon_res, values_from = number, values_fill = 0)
  
  # Calcul de l'indice de diversité pour chaque période
  df_div <- df_wide %>%
    rowwise() %>%
    mutate(diversity = diversity(c_across(-c(time_group, !!show_by)), index = richness_index)) %>%
    ungroup()
  
  time_fr <- translate(time_res)
  
  # Graphique
  ggplot(df_div, aes(x = time_group, y = diversity, color = !!show_by)) +
    geom_line(size = 1.2) +
    geom_point(size = 2) +
    labs(
      caption = paste("Indice de diversité (", richness_index, ") au cours du temps", sep = ""),
      x = paste("Temps (", time_fr, ")", sep = ""),
      y = paste("Indice de diversité -", richness_index)
    ) +
    theme_minimal()+
    theme(
      plot.caption = element_text(hjust = 0.5, face = "bold", size = 14, margin = margin(t = 15))
    ) +
    facet_wrap(vars(!!show_by))
}
