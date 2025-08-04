
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
          checkboxInput(ns("show_deployment"), "Afficher les déployments", TRUE),
          radioButtons(ns("color"), "Couleur du plot :", choices = c("skyblue", "lightpink", "lightgreen"))
        )
      } else {
        NULL
      }
    })
    
    # expose reactive list, i.e. param values, for analysis/visu modules
    params <- reactive({
      req(analysis_type())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "monitoring XXX") {
          list(
            color = input$color %||% "skyblue"
          )
        }
        else if (selected_analysis() == "monitoring YYY") {
          list(
            show_deployment = input$show_monitoring %||% TRUE
          )
        }
      } else if (analysis_type() == "species") {
        list()
      } else if (analysis_type() == "community") {
        list()
      } else {
        list()
      }
    })
    
    return(params)
  })
}