library(shiny)
library(dplyr)
library(readr)


source("server.R")
source("ui.R")
source("R/data.R")

source("R/mod_data_prep.R")
# source("R/analysis/mod_monitoring.R")
# source("R/analysis/mod_species.R")
# source("R/analysis/mod_community.R")
source("R/mod_display_params.R")
source("R/mod_monitoring.R")
source("R/mod_species.R")
source("R/mod_community.R")

# source("R/utils/sample_historic.R")
source("R/sample_historic.R")



shinyApp(ui, server)