library(ggplot2)

source("R/sampling_numbers.R")

plot_EP_species <- function (df, selected_species, start_date, end_date, interval_ind, show_by, title, label_x, label_y){

  # Prétraitement des dates
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  # Filtrage par espèce
  if (!is.null(selected_species)) {
    df <- df %>% filter(species %in% selected_species)
  }
  
  df <- nb_EP_par_espece(df, interval_ind, show_by)
  
  show_by <- sym(show_by)
  
  plot <- ggplot(df, aes(x = nb_evenements, y = reorder(species, nb_evenements))) +
    geom_point(color = "steelblue", size = 3) +
    labs(
      caption = title,
      x = label_x,
      y = label_y
    ) +
    theme_minimal() +
    theme(
      plot.caption = element_text(hjust = 0.5, face = "bold", size = 14, margin = margin(t = 15))
    ) +
    facet_wrap(vars(!!show_by))
  
  print(plot)
}
