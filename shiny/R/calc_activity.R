calc_activity <- function(df, selected_species) {

  df <- df %>% filter(!is.na(date))
  df$date <- as.character(df$date)
  dt <- as.POSIXlt(df$date, format = "%Y-%m-%d %H:%M:%S")
  
  times <- dt$hour + dt$min / 60
  times <- times[df$species == selected_species]
  times_rad <- times / 24 * 2 * pi
  times_rad <- times_rad[!is.na(times_rad)]
  
  dens_data <- densityPlot(times_rad, dataOnly = TRUE)
  
  courbe <- data.frame(heure = dens_data$x, densite = dens_data$y)
  df_points <- data.frame(heure = times)
  
  list(courbe = courbe, df_points = df_points)
}