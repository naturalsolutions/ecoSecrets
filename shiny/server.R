server <- function(input, output, session) {
  
  # global reactive variables
  analysis_type <- reactive(input$main_tabs)
  selected_analysis <- reactive(input$main_select)
  
  #
  data <- mod_data_prep_server("data_prep")
  params <- mod_display_params_server("display_params", analysis_type, selected_analysis, data)
  export <- mod_export_server("export")
  
  # dynamic update of selectInput options
  observeEvent(input$main_tabs, {
    choices <- switch(input$main_tabs,
                      "monitoring" = c("Historique d'échantillonnage", "Effort d'échantillonnage"),
                      "community" = c("Abondance", "Indice de diversité"),
                      "species" = c("Taux de détection", "species YYY"),
                      "activity" = c("Modèle d'activité"),
                      character(0))
    updateSelectInput(session, "main_select",
                      choices = choices,
                      selected = choices[1])
  })
  
  # Display selected analyse
  # active module ui
  output$dynamic_module_ui <- renderUI({
    ns <- NS("dynamic_module")
    
    if (input$main_tabs == "monitoring") {
      tagList(
        div(id = "module_container",
            fluidRow(
              column(4, div(class="small-block", uiOutput(ns("nb_EP")))),
              column(4, div(class="small-block", uiOutput(ns("nb_trap_days_estimated")))),
              column(4, div(class="small-block", uiOutput(ns("nb_trap_days_real")))),
            fluidRow(
              # Grand bloc en dessous qui prend tout l'espace restant
              column(12,div(class="large-block", plotOutput(ns("plot")))))
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
  
  # active module ui server
  observeEvent(input$main_tabs, {
    if (input$main_tabs == "monitoring") {
      mod_monitoring_server("dynamic_module",
                            selected_analysis = selected_analysis,
                            data = data,
                            params = params)
    } else if (input$main_tabs == "community") {
      mod_community_server("dynamic_module",
                           selected_analysis = selected_analysis,
                           data = data,
                           params = params)
    } else if (input$main_tabs == "species") {
      mod_species_server("dynamic_module",
                         selected_analysis = selected_analysis,
                         data = data,
                         params = params)
    }  else if (input$main_tabs == "activity") {
      mod_activity_server("dynamic_module",
                           selected_analysis = selected_analysis,
                           data = data,
                           params = params)
    }
  })
}