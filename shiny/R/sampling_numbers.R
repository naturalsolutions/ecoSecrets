library(tidyverse)
library(lubridate)
library(dplyr)

#================== NOMBRE EVENEMENT PHOTOGRAPHIQUE=============================

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

#================== JOURS THEORIQUES ====================================

nb_trap_days_estimated <- function(df, deployment, start_date, end_date) {
  
  #Filtre déploiement
  if (!is.null(deployment)) {
    df <- df %>% filter(ecopont == deployment)
  }
  
  # Prétraitement des dates
  df <- df %>%
    mutate(date = as.POSIXct(date, format = "%d/%m/%Y %H:%M"),
           date = as.Date(date))
  
  #Filtre date
  df <- df %>% filter(date >= start_date, date <= end_date)
  
  # Calcul de la différence de jours
  diff <- as.numeric(difftime(max(df$date, na.rm = TRUE), min(df$date, na.rm = TRUE), units = "days")) + 1
  
  return(diff)
}

#================== JOURS REELS ====================================

nb_trap_days_real <- function(df, deployment, start_date, end_date) {

  #Filtre déploiement
  if (!is.null(deployment)) {
    df <- df %>% filter(ecopont == deployment)
  }
  
  #Filtre date
  df <- df %>%
    mutate(date = as.POSIXct(date, format = "%d/%m/%Y %H:%M"),
           date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  df <- df[!is.na(df$date), ]
  jours_uniques <- unique(as.Date(df$date))
  length(jours_uniques)
}
