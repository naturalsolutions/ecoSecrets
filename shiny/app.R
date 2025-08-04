library(shiny)
library(dplyr)


source("server.R")
source("ui.R")

source("R/mod_data_prep.R")
source("R/analysis/mod_monitoring.R")
source("R/analysis/mod_species.R")
source("R/analysis/mod_community.R")
# source("R/mod_monitoring.R")
# source("R/mod_species.R")
# source("R/mod_community.R")

shinyApp(ui, server)