mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    radioButtons(ns("project_select"), "Choix du projet :", choices = c("Projet 1", "Projet 2"), selected = "Projet 1")
  )
}

mod_data_prep_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    data <- reactive({
      set.seed(1234)
      df <- data.frame(
        project = c(rep("Projet 1", 50), rep("Projet 2", 50)),
        deployment = sample(c("deployment A", "deployment B", "deployment C"), size = 100, replace = TRUE),
        value = rnorm(100)
      )
      req(input$project_select)
      dplyr::filter(df, project == input$project_select)
    })
    return(data)
  })
}