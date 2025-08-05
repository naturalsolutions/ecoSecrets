library(ggplot2)
library(dplyr)
library(lubridate)

barplot_compo_com <- function(df, start_date = "18/01/2023", end_date = "31/12/2023", taxon = "genus", periode = "month", pourcent = FALSE, stack = TRUE) {
  taxon <- sym(taxon)
  
  if (!is.null(start_date)) {
    start_date <- as.Date(start_date, format = "%d/%m/%Y")
  }
  if (!is.null(end_date)) {
    end_date <- as.Date(end_date, format = "%d/%m/%Y")
  }
  
  if (!is.null(start_date) & !is.null(end_date)) {
    df <- df %>% filter(date >= start_date, date <= end_date)
  } else if (!is.null(start_date)) {
    df <- df %>% filter(date >= start_date)
  } else if (!is.null(end_date)) {
    df <- df %>% filter(date <= end_date)
  }
  
  df <- df %>%
    mutate(date = as.Date(date),
           date_floor = floor_date(date, unit = periode)) %>%
    group_by(date_floor, !!taxon) %>%
    summarise(total_estime = sum(number, na.rm = TRUE), .groups = "drop")
  
  # Choix du type de position : empilé ou côte à côte
  position_type <- ifelse(stack, "stack", "dodge")
  
  # Fonction utilitaire pour mettre une majuscule au début
  ucfirst <- function(s) {
    paste0(toupper(substring(s, 1, 1)), substring(s, 2))
  }
  
  if (pourcent) {
    df <- df %>%
      group_by(date_floor) %>%
      mutate(pourcent = total_estime / sum(total_estime) * 100) %>%
      ungroup()
    
    ggplot(df, aes(x = date_floor, y = pourcent, fill = !!taxon)) +
      geom_bar(stat = "identity", position = position_type) +
      labs(
        title = paste("Relative abundance per", periode, "(in %)"),
        x = ucfirst(periode),
        y = "Percentage",
        fill = "Species"
      ) +
      theme_minimal() +
      theme(axis.text.x = element_text(angle = 45, hjust = 1))
    
  } else {
    ggplot(df, aes(x = date_floor, y = total_estime, fill = !!taxon)) +
      geom_bar(stat = "identity", position = position_type) +
      labs(
        title = paste("Absolute abundance per", periode),
        x = ucfirst(periode),
        y = "Estimated number",
        fill = "Spieces"
      ) +
      theme_minimal() +
      theme(axis.text.x = element_text(angle = 45, hjust = 1))
  }
}