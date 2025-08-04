mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    radioButtons(ns("project_select"), "Choix du projet :", choices = c("ecopont"), selected = "ecopont")
  )
}

mod_data_prep_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    data <- reactive({
      set.seed(1234)
      df <- dataset
      req(input$project_select)
      dplyr::filter(df, project == input$project_select)
    })
    return(data)
  })
}