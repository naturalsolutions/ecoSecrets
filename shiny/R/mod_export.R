mod_export_ui <- function(id) {
  ns <- NS(id)
  tagList(
    textInput(ns("title"), label="Titre"),
    textInput(ns("label_x"), label="Légende axe x"),
    textInput(ns("label_y"), label="Légende axe y")
  )
}

mod_export_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    
    export <- reactive({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          list(
            title = ifelse(input$title == "", "Historique d'échantillonnage des déploiements", input$title),
            label_x = ifelse(input$label_x == "", "Temps", input$label_x),
            label_y = ifelse(input$label_y == "", "Déploiements", input$label_y)
          )
        } else if (selected_analysis() == "Effort d'échantillonnage") {
          list(
            title = ifelse(input$title == "", "Effort d'échantillonnage en fonction du temps", input$title),
            label_x = ifelse(input$label_x == "", "Temps", input$label_x),
            label_y = ifelse(input$label_y == "", "Nombre de déploiements actifs", input$label_y)
          )
        }
      }
    })
    return(export)
  })
}