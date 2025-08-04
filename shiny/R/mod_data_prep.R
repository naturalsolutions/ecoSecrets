mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    selectInput(ns("project_select"), "Choix du projet :", choices = c("ecopont"), selected = "ecopont"),
    selectInput(ns("site_select"), "Choix du site :", choices = c("Montagny-les-Lanches", "Porte de Savoie", "Torchefelon"), selected = "Montagny-les-Lanches"),
    selectInput(ns("deployment_select"), "Choix du déploiement :", choices = c("MLL_1_2023", "MLL_2_2023", "MLL_3_2023", "MLL_4_2023")),
    checkboxInput(ns("empty_select"),"Retirer les élements vides", value = FALSE),
    checkboxInput(ns("undetermined_select"),"Retirer les élements indéterminés", value = FALSE),
    checkboxInput(ns("human_select"),"Retirer les humains", value = FALSE),
    checkboxInput(ns("vehicle_select"),"Retirer les véhicules", value = FALSE)
    )
}

mod_data_prep_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    data <- reactive({
      set.seed(1234)
      df <- dataset
      req(input$project_select, input$site_select, input$deployment_select)
      dplyr::filter(df, project == input$project_select, site == input$site_select, deployment == input$deployment_select)
    })
    return(data)
  })
}