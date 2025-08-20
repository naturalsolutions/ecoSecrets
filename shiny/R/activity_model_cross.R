library(camtrapR)
library(overlap)
library(dplyr)
library(ggplot2)

source("R/calc_activity.R")

activity_model_cross <- function(df, species1, species2 = NULL) {
  
  # Calcul activité pour espèce 1
  data1 <- calc_activity(df, selected_species = species1)
  data1$courbe$species <- species1
  data1$df_points$species <- species1
  
  # Cas 1 : une seule espèce demandée
  if (is.null(species2) || species2 == "") {
    
    ggplot() +
      annotate("rect", xmin = -3, xmax = 0, ymin = -Inf, ymax = Inf,
               fill = "gray90", alpha = 0.5) +
      annotate("rect", xmin = 24, xmax = 27, ymin = -Inf, ymax = Inf,
               fill = "gray90", alpha = 0.5) +
      geom_line(data = data1$courbe, aes(x = heure, y = densite, color = species),
                size = 1) +
      geom_segment(data = data1$df_points,
                   aes(x = heure, xend = heure, y = 0, yend = 0.005, color = species),
                   alpha = 0.5) +
      labs(caption = paste("Modèle d'activité -", species1),
           x = "Heure", y = "Densité", color = "Espèce") +
      theme_minimal() +
      theme(
        plot.caption = element_text(hjust = 0.5, face = "bold", size = 14, margin = margin(t = 15))
      )  
    
  } else {
    # Cas 2 : comparaison entre deux espèces
    
    data2 <- calc_activity(df, selected_species = species2)
    data2$courbe$species <- species2
    data2$df_points$species <- species2
    
    courbes_all <- rbind(data1$courbe, data2$courbe)
    points_all <- rbind(data1$df_points, data2$df_points)
    
    # Interpolation 0-24h
    heure_seq <- seq(0, 24, length.out = 500)
    dens1_interp <- approx(data1$courbe$heure, data1$courbe$densite,
                           xout = heure_seq, rule = 2)$y
    dens2_interp <- approx(data2$courbe$heure, data2$courbe$densite,
                           xout = heure_seq, rule = 2)$y
    dens_common <- pmin(dens1_interp, dens2_interp)
    common_zone <- data.frame(heure = heure_seq, densite = dens_common)
    
    ggplot() +
      annotate("rect", xmin = -3, xmax = 0, ymin = -Inf, ymax = Inf,
               fill = "gray90", alpha = 0.5) +
      annotate("rect", xmin = 24, xmax = 27, ymin = -Inf, ymax = Inf,
               fill = "gray90", alpha = 0.5) +
      geom_ribbon(data = common_zone,
                  aes(x = heure, ymin = 0, ymax = densite),
                  fill = "purple", alpha = 0.3) +
      geom_line(data = courbes_all,
                aes(x = heure, y = densite, color = species), size = 1) +
      geom_segment(data = points_all,
                   aes(x = heure, xend = heure, y = 0, yend = 0.005, color = species),
                   alpha = 0.5) +
      labs(caption = paste("Densité d'activité commune -", species1, "et", species2),
           x = "Heure", y = "Densité", color = "Espèce") +
      theme_minimal() +
      theme(
        plot.caption = element_text(hjust = 0.5, face = "bold", size = 14, margin = margin(t = 15))
      )  
  }
}
