server <- function(input, output, session) {
  
  # global reactive variables
  analysis_type <- reactive(input$main_tabs)
  selected_analysis <- reactive(input$main_select)
  
  #
  data <- mod_data_prep_server("data_prep")
  params <- mod_display_params_server("display_params", analysis_type, selected_analysis)
  
  # dynamic update of selectInput options
  observeEvent(input$main_tabs, {
    choices <- switch(input$main_tabs,
                      "monitoring" = c("Historique d'échantillonnage", "monitoring YYY"),
                      "species" = c("species XXX", "species YYY"),
                      "community" = c("Abondance", "Indice de diversité"),
                      character(0))
    updateSelectInput(session, "main_select",
                      choices = choices,
                      selected = choices[1])
  })
  
  # Display selected analyse
  # active module ui
  output$dynamic_module_ui <- renderUI({
    ns <- NS("dynamic_module")
    tagList(
      div(id = "module_container",
          switch(input$main_tabs,
                 "monitoring" = mod_monitoring_ui("dynamic_module"),
                 "species" = mod_species_ui("dynamic_module"),
                 "community" = mod_community_ui("dynamic_module")
          )
      )
    )
  })
  
  # active module ui server
  observeEvent(input$main_tabs, {
    if (input$main_tabs == "monitoring") {
      mod_monitoring_server("dynamic_module",
                            selected_analysis = selected_analysis,
                            data = data,
                            params = params)
    } else if (input$main_tabs == "species") {
      mod_species_server("dynamic_module",
                         selected_analysis = selected_analysis,
                         data = data,
                         params = params)
    } else if (input$main_tabs == "community") {
      mod_community_server("dynamic_module",
                           selected_analysis = selected_analysis,
                           data = data,
                           params = params)
    }
  })
}