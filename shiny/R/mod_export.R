mod_export_ui <- function(id) {
  ns <- NS(id)
  uiOutput(ns("ui_export"))
}

mod_export_server <- function(id, analysis_type, selected_analysis) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    
    output$ui_export <- renderUI({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          tagList(
            textInput(ns("title"), label="Titre", value="Historique d'échantillonnage des déploiements"),
            textInput(ns("label_x"), label="Légende axe x", value= "Temps"),
            textInput(ns("label_y"), label="Légende axe y", value= "Déploiements")
          )
        } else if (selected_analysis() == "Effort d'échantillonnage") {
          tagList(
            textInput(ns("title"), label="Titre", value="Effort d'échantillonnage"),
            textInput(ns("label_x"), label="Légende axe x", value= "Temps"),
            textInput(ns("label_y"), label="Légende axe y", value= "Nombre de déploiments actifs")
          )
        }
      } else if (analysis_type() == "species") {
        if (selected_analysis() == "Taux de détection") {
          list(
            textInput(ns("title"), label="Titre", value="Taux de détection par espèce"),
            textInput(ns("label_x"), label="Légende axe x", value= "Taux de détection"),
            textInput(ns("label_y"), label="Légende axe y", value= "Espèces")
          )
        } else if (selected_analysis() == "species YYY") {
          list(
            textInput(ns("title"), label="Titre", value="Nombre d'évènements photographiques par espèce"),
            textInput(ns("label_x"), label="Légende axe x", value= "Nombre d'évenements photographiques"),
            textInput(ns("label_y"), label="Légende axe y", value= "Espèces")
          )
        }
      } 
    })
    
    export <- reactive({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          list(
            title = input$title,
            label_x = input$label_x,
            label_y = input$label_y
          )
        } else if (selected_analysis() == "Effort d'échantillonnage") {
          list(
            title = input$title,
            label_x = input$label_x,
            label_y = input$label_y
          )
        }
      } else if (analysis_type() == "species") {
        if (selected_analysis() == "Taux de détection") {
          list(
            title = input$title,
            label_x = input$label_x,
            label_y = input$label_y
          )
        } else if (selected_analysis() == "species YYY") {
          list(
            title = input$title,
            label_x = input$label_x,
            label_y = input$label_y
          )
        }
      }
    })
    return(export)
  })
}