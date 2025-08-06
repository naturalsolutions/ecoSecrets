'%||%' <- function(a, b) if (!is.null(a)) a else b

mod_display_params_ui <- function(id) {
  ns <- NS(id)
  uiOutput(ns("ui_params"))
}

mod_display_params_server <- function(id, analysis_type, selected_analysis) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    
    output$ui_params <- renderUI({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        tagList(
          dateRangeInput(ns("period_select"), "Choisir une période d'étude :", start = "2023-01-18", end = "2024-12-31", startview = "month"),
          checkboxInput(ns("show_observation"), "Afficher les observations", TRUE),
          selectInput(ns("species_select"), "Choisir une espèce :", choices = unique(dataset$species)),
          numericInput(ns("interval_ind"), "Choisir un intervalle d'indépendance :", value = 0, min = 1, max = 300, step = 5)
        )
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
          tagList(
            dateRangeInput(ns("period_select"), "Choisir une période d'étude :", start = "2023-01-18", end = "2024-12-31", startview = "month"),
            selectInput(ns("time_select"), "Choisir la résolution temporelle :", choices = c("year", "month", "week", "day"), selected = "month"),
            selectInput(ns("taxon_select"), "Choisir la résolution taxonomique :", choices = c("class", "order", "genus", "family", "species"), selected = "genus"),
            numericInput(ns("interval_ind"), "Choisir un intervalle d'indépendance :", value = 0, min = 1, max = 300, step = 5),
            checkboxInput(ns("show_abundance"), "Abondance relative/absolue", TRUE),
            checkboxInput(ns("show_group"), "affichage groupé/empilé", TRUE)
          )
        } else if (selected_analysis() == "Indice de diversité") {
          tagList(
            dateRangeInput(ns("period_select"), "Choisir une période d'étude :", start = "2023-01-18", end = "2024-12-31", startview = "month"),
            selectInput(ns("taxon_select"), "Choisir la résolution taxonomique :", choices = c("class", "order", "genus", "family", "species"), selected = "genus"),
            selectInput(ns("index_select"), "Choisir l'indice de richesse :", choices = c("shannon", "simpson"), selected = "shannon")
          )
        }
      } else if (analysis_type() == "species") {
        tagList(
          dateRangeInput(ns("period_select"), "Choisir une période d'étude :", start = "2023-01-18", end = "2024-12-31", startview = "month"),
          selectizeInput(ns("species_select"), "Choisir une espèce :", choices = unique(dataset$species), selected = unique(dataset$species), multiple = TRUE),
          numericInput(ns("interval_ind"), "Choisir un intervalle d'indépendance :", value = 0, min = 1, max = 300, step = 5)
        )
      }
    })
    
    # Reactive values
    params <- reactive({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          list(
            species_select = input$species_select,
            show_observation = input$show_observation,
            start_date = input$period_select[1],
            end_date = input$period_select[2],
            interval_ind = input$interval_ind
          )
        } else if (selected_analysis() == "monitoring YYY") {
          list(
            show_deployment = input$show_monitoring %||% TRUE
          )
        }
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
          list(
            time_select = input$time_select,
            taxon_select = input$taxon_select,
            show_abundance = input$show_abundance,
            show_group = input$show_group,
            start_date = input$period_select[1],
            end_date = input$period_select[2]
          )
        } else if (selected_analysis() == "Indice de diversité") {
          list(
            start_date = input$period_select[1],
            end_date = input$period_select[2],
            taxon_select = input$taxon_select,
            index_select = input$index_select
          )
        }
      } else if (analysis_type() == "species") {
        if (selected_analysis() == "species XXX") {
          list(
            start_date = input$period_select[1],
            end_date = input$period_select[2],
            species = input$species_select,
            interval_ind = input$interval_ind
          )
        }
        else if (selected_analysis() == "species YYY") {
          list(
            start_date = input$period_select[1],
            end_date = input$period_select[2],
            taxon_select = input$taxon_select,
            index_select = input$index_select
          )
        }
        
      }
    })
    
    return(params)
  })
}
