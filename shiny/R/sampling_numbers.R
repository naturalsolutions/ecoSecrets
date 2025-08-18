library(tidyverse)
library(lubridate)
library(dplyr)

#================== NOMBRE EVENEMENT PHOTOGRAPHIQUE GLOBAL =============================

nb_EP <- function(df, interval_ind=5) {
  
  df %>%
    arrange(species, date) %>%
    group_by(species) %>%
    mutate(
      temps_ecoule = as.numeric(difftime(date, lag(date), units = "mins")),
      nouvel_evenement = is.na(temps_ecoule) | temps_ecoule > interval_ind
    ) %>%
    summarise(nb_evenements = sum(nouvel_evenement)) %>%
    summarise(total_evenements = sum(nb_evenements)) %>%
    pull(total_evenements)
}

#================== NOMBRE EVENEMENT PHOTOGRAPHIQUE PAR ESPECE =============================

nb_EP_par_espece <- function(df, interval_ind = 5) {
  df %>%
    mutate(
      species = ifelse(is.na(species) | species == "", "Indéterminé", species)
    ) %>%
    filter(!is.na(date)) %>%  # On garde quand même des dates valides
    arrange(species, date) %>%
    group_by(species) %>%
    filter(n() > 0) %>%
    mutate(
      temps_ecoule = as.numeric(difftime(date, lag(date), units = "mins")),
      nouvel_evenement = is.na(temps_ecoule) | temps_ecoule > interval_ind
    ) %>%
    summarise(nb_evenements = sum(nouvel_evenement), .groups = "drop")
}

#================== JOURS THEORIQUES ====================================

nb_trap_days_estimated <- function(df, start_date, end_date) {
  
  # Prétraitement des dates
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  # Calcul de la différence de jours
  diff <- as.numeric(difftime(max(df$date, na.rm = TRUE), min(df$date, na.rm = TRUE), units = "days")) + 1
}

#================== JOURS REELS ====================================

nb_trap_days_real <- function(df, start_date, end_date) {

  #Filtre date
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  df <- df[!is.na(df$date), ]
  jours_uniques <- unique(as.Date(df$date))
  length(jours_uniques)
}
