library(ggplot2)

source("R/sampling_numbers.R")

plot_EP_species <- function (df, species, start_date, end_date, interval_ind){
  
  # Prétraitement des dates
  df <- df %>%
    mutate(date = as.Date(date)) %>%
    filter(date >= start_date, date <= end_date)
  
  df <- nb_EP_par_espece(df, interval_ind)
  
  plot <- ggplot(df, aes(x = nb_evenements, y = reorder(species, nb_evenements))) +
    geom_point(color = "steelblue", size = 3) +
    labs(
      caption = "Nombre d'évènements photographiques par espèce",
      x = "Espèce",
      y = "Nombre d'évènements photographiques"
    ) +
    theme_minimal() +
    theme(
      plot.caption = element_text(hjust = 0.5, face = "bold", size = 14, margin = margin(t = 15))
    )
  
  print(plot)
}
