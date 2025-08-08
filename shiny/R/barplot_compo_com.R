library(ggplot2)
library(dplyr)
library(lubridate)

barplot_compo_com <- function(df, start_date = NULL, end_date = NULL, taxon = "genus", periode = "month", pourcent = FALSE, position_type = "stack", show_by = "project") {
  taxon <- sym(taxon)
  show_by <- sym(show_by)
  
  # filter date
  if (!is.null(start_date)) {
    start_date <- as.Date(start_date, format = "%d/%m/%Y")
    df <- df %>% filter(date >= start_date)
  }
  if (!is.null(end_date)) {
    end_date <- as.Date(end_date, format = "%d/%m/%Y")
    df <- df %>% filter(date <= end_date)
  }
  
  # compute total abundance
  df <- df %>%
    mutate(date_floor = floor_date(date, unit = periode)) %>%
    group_by(date_floor, !!show_by, !!taxon) %>%
    summarise(total = sum(number, na.rm = TRUE), .groups = "drop")
  
  # Fonction utilitaire pour mettre une majuscule au début
  ucfirst <- function(s) {
    paste0(toupper(substring(s, 1, 1)), substring(s, 2))
  }
  
  # compute relative abundance if needed
  if (pourcent) {
    df <- df %>%
      group_by(date_floor, !!show_by) %>%
      mutate(total = total / sum(total) * 100) %>%
      ungroup()
  }
  
  # plot
  title = paste("Relative abundance per", periode, "(in %)")
  x = ucfirst(periode)
  y = "Percentage"
  fill = "Taxon"
  
  if (pourcent) {
    title = paste("Absolute abundance per", periode)
    y = "Estimated number"
  }
  
  ggplot(df, aes(x = date_floor, y = total, fill = !!taxon)) +
      geom_bar(stat = "identity", position = position_type) +
      labs(
      title = title,
      x = x,
      y = y,
      fill = fill
      ) +
      theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
    facet_wrap(vars(!!show_by))
}