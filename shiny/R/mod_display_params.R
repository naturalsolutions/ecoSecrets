  '%||%' <- function(a, b) if (!is.null(a)) a else b

mod_display_params_ui <- function(id) {
  ns <- NS(id)
  uiOutput(ns("ui_params"))
}

mod_display_params_server <- function(id, analysis_type, selected_analysis, data) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    
    output$ui_params <- renderUI({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        tagList(
          dateRangeInput(ns("period_select"), "Choisir une période d'étude :", start = min(as.Date(data()$date), na.rm = TRUE), end = max(as.Date(data()$date), na.rm = TRUE), startview = "month"),
          checkboxInput(ns("show_observation"), "Afficher les observations", FALSE),
          selectInput(ns("species_select"), "Choisir une espèce :", choices = unique(dataset$species), selected = NULL),
          numericInput(ns("interval_ind"), "Choisir un intervalle d'indépendance :", value = 0, min = 1, max = 300, step = 5)
        )
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
          tagList(
            dateRangeInput(ns("daterange"), "Période d'étude :", start = min(as.Date(data()$date), na.rm = TRUE), end = max(as.Date(data()$date), na.rm = TRUE)),
            selectInput(ns("time_select"), "Résolution temporelle :", choices = c("Année" = "year", "Mois" = "month", "Semaine" = "week", "Jour" = "day"), selected = "month"),
            selectInput(ns("taxon_select"), "Résolution taxonomique :", choices = c("Classe" = "class", "Ordre" = "order", "Famille" = "family", "Genre" = "genus", "Espèce" = "species"), selected = "species"),
            numericInput(ns("interval_ind"), "Intervalle d'indépendance (min) :", value = 0, min = 1, max = 300, step = 5),
            shinyWidgets::switchInput(ns("show_abundance"), label = "Abondance", onLabel = "Relative", offLabel = "Absolue", value = TRUE),
            shinyWidgets::switchInput(ns("show_group"), label = "Affichage", onLabel = "Empilé", offLabel = "Groupé", value = TRUE),
            radioButtons(ns("show_by"), "Affichage par :", choices = c("Projet" = "project", "Site" = "site", "Déploiement" = "deployment"), selected = "project")
          )
        } else if (selected_analysis() == "Indice de diversité") {
          tagList(
            dateRangeInput(ns("period_select"), "Choisir une période d'étude :", startview = "month"),
            selectInput(ns("taxon_select"), "Choisir la résolution taxonomique :", choices = c("class", "order", "genus", "family", "species"), selected = "genus"),
            selectInput(ns("index_select"), "Choisir l'indice de richesse :", choices = c("shannon", "simpson"), selected = "shannon")
          )
        }
      } else if (analysis_type() == "species") {
        tagList(
          dateRangeInput(ns("period_select"), "Choisir une période d'étude :", startview = "month"),
          selectizeInput(ns("species_select"), "Choisir une espèce :", choices = unique(dataset$species), selected = unique(dataset$species), multiple = TRUE),
          numericInput(ns("interval_ind"), "Choisir un intervalle d'indépendance :", value = 0, min = 1, max = 300, step = 5)
        )
      }
    })
    
    # Reactive values
    params <- reactive({
      df <- data()
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          list(
            species_select = input$species_select %||% NULL,
            show_observation = input$show_observation %||% FALSE,
            start_date = input$period_select[1] %||% min(as.Date(df$date), na.rm = TRUE),
            end_date = input$period_select[2] %||% max(as.Date(df$date), na.rm = TRUE),
            interval_ind = input$interval_ind %||% 1
          )
        } else if (selected_analysis() == "monitoring YYY") {
          list(
            show_deployment = input$show_monitoring %||% TRUE
          )
        }
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
          list(
            time_select = input$time_select  %||% "month",
            taxon_select = input$taxon_select %||% "species",
            show_abundance = input$show_abundance %||% TRUE,
            show_group = if (isTRUE(input$show_group %||% TRUE)) "stack" else "dodge",
            start_date = input$daterange[1] %||% min(as.Date(df$date), na.rm = TRUE),
            end_date = input$daterange[2] %||% max(as.Date(df$date), na.rm = TRUE),
            show_by = input$show_by %||% "project"
          )
        } else if (selected_analysis() == "Indice de diversité") {
          list(
            start_date = input$period_select[1] %||% min(as.Date(df$date), na.rm = TRUE),
            end_date = input$period_select[2] %||% max(as.Date(df$date), na.rm = TRUE),
            taxon_select = input$taxon_select %||% "genus",
            index_select = input$index_select %||% "shannon"
          )
        }
      } else if (analysis_type() == "species") {
        if (selected_analysis() == "species XXX") {
          list(
            start_date = input$period_select[1] %||% min(as.Date(df$date), na.rm = TRUE),
            end_date = input$period_select[2] %||% max(as.Date(df$date), na.rm = TRUE),
            species = input$species_select,
            interval_ind = input$interval_ind %||% 1
          )
        }
        else if (selected_analysis() == "species YYY") {
          list(
            start_date = input$period_select[1] %||% min(as.Date(df$date), na.rm = TRUE),
            end_date = input$period_select[2] %||% max(as.Date(df$date), na.rm = TRUE),
            taxon_select = input$taxon_select,
            index_select = input$index_select
          )
        }
        
      }
    })
    
    return(params)
  })
}
