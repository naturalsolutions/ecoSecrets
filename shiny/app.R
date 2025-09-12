library(shiny)
library(dplyr)
library(readr)
library(tidyr)
library(shinyWidgets)
library(lubridate)
library(ggplot2)
library(data.table)
library(vegan)
library(camtrapR)
library(overlap)

source("R/data.R")
source("R/mod_data_prep.R")
source("R/mod_display_params.R")
source("R/mod_monitoring.R")
source("R/mod_species.R")
source("R/mod_community.R")
source("R/mod_activity.R")
source("R/sample_historic.R")
source("R/barplot_compo_com.R")
source("R/richness_index.R")
source("R/sampling_numbers.R")
source("R/detection_rate.R")
source("R/plot_EP_species.R")
source("R/activity_model_cross.R")
source("R/calc_activity.R")
source("R/translate.R")
source("R/mod_export.R")

source("ui.R")

server <- function(input, output, session) {
  data <- reactive({
    cat("Loading data from load_data()\n")
    d <- load_data()
    cat("Data loaded, dimensions:\n")
    print(dim(d))
    cat("Data head:\n")
    print(head(d))
    d
  })

  output$data_warning <- renderUI({
    cat("Checking data_warning\n")
    if (nrow(data()) == 0) {
      cat("Data warning triggered: empty data\n")
      div(style = "color: red; text-align: center; margin-bottom: 10px;",
          "Data warning triggered: empty data in /home/app/export.csv")
    } else {
      cat("Data warning not triggered: data present\n")
      NULL
    }
  })

  analysis_type <- reactive({
    cat("Analysis type:\n")
    print(input$main_tabs)
    input$main_tabs
  })
  selected_analysis <- reactive({
    cat("Selected analysis:\n")
    print(input$main_select)
    input$main_select
  })

  filtered_data <- reactive({
    cat("Calling mod_data_prep_server\n")
    d <- mod_data_prep_server("data_prep", data)
    cat("Filtered data dimensions:\n")
    print(dim(d()))
    cat("Filtered data head:\n")
    print(head(d()))
    d
  })

  params <- reactive({
    cat("Calling mod_display_params_server\n")
    p <- mod_display_params_server("display_params", analysis_type, selected_analysis, filtered_data())
    cat("Params:\n")
    print(p())
    p
  })

  export <- reactive({
    cat("Calling mod_export_server\n")
    e <- mod_export_server("export", analysis_type, selected_analysis, params())
    cat("Export:\n")
    print(e())
    e
  })

  observeEvent(input$main_tabs, {
    cat("Updating main_select choices\n")
    choices <- switch(input$main_tabs,
                      "monitoring" = c("Historique d'échantillonnage", "Effort d'échantillonnage"),
                      "community" = c("Abondance", "Indice de diversité"),
                      "species" = c("Taux de détection", "species YYY"),
                      "activity" = c("Modèle d'activité"),
                      character(0))
    updateSelectInput(session, "main_select",
                      choices = choices,
                      selected = choices[1] %||% NULL)
  })

  observe({
    if (is.null(input$main_select) || input$main_select == "") {
      cat("Forcing initial main_select update\n")
      updateSelectInput(session, "main_select",
                        selected = switch(input$main_tabs,
                                         "monitoring" = "Historique d'échantillonnage",
                                         "community" = "Abondance",
                                         "species" = "Taux de détection",
                                         "activity" = "Modèle d'activité",
                                         NULL))
    }
  })

  output$dynamic_module_ui <- renderUI({
    ns <- NS("dynamic_module")
    cat("Rendering dynamic_module_ui\n")
    cat("Main tabs:\n")
    print(input$main_tabs)
    cat("Main select:\n")
    print(input$main_select)
    if (input$main_tabs == "monitoring") {
      tagList(
        div(id = "module_container",
            fluidRow(
              column(4, div(class="small-block", uiOutput(ns("nb_EP")))),
              column(4, div(class="small-block", uiOutput(ns("nb_trap_days_estimated")))),
              column(4, div(class="small-block", uiOutput(ns("nb_trap_days_real"))))
            ),
            fluidRow(
              column(12, div(class="large-block", plotOutput(ns("plot"))))
            )
        )
      )
    } else {
      div(id = "module_container",
          switch(input$main_tabs,
                 "community" = mod_community_ui("dynamic_module"),
                 "species" = mod_species_ui("dynamic_module"),
                 "activity" = mod_activity_ui("dynamic_module")
          )
      )
    }
  })

  observeEvent(input$main_tabs, {
    cat("Activating module server for:\n")
    print(input$main_tabs)
    if (input$main_tabs == "monitoring") {
      mod_monitoring_server("dynamic_module",
                           selected_analysis = selected_analysis,
                           data = filtered_data(),
                           params = params(),
                           export = export())
    } else if (input$main_tabs == "community") {
      mod_community_server("dynamic_module",
                          selected_analysis = selected_analysis,
                          data = filtered_data(),
                          params = params(),
                          export = export())
    } else if (input$main_tabs == "species") {
      mod_species_server("dynamic_module",
                         selected_analysis = selected_analysis,
                         data = filtered_data(),
                         params = params(),
                         export = export())
    } else if (input$main_tabs == "activity") {
      mod_activity_server("dynamic_module",
                          selected_analysis = selected_analysis,
                          data = filtered_data(),
                          params = params(),
                          export = export())
    }
  })
}

runApp(shinyApp(ui, server), port = 8180, host = "0.0.0.0")