'%||%' <- function(a, b) if (!is.null(a)) a else b

mod_export_ui <- function(id) {
  ns <- NS(id)
  uiOutput(ns("ui_export"))
}

mod_export_server <- function(id, analysis_type, selected_analysis, params) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    
    output$ui_export <- renderUI({
      req(analysis_type(), selected_analysis(), params())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          tagList(
            textInput(ns("title_hist"), label="Titre", value= "Historique d'échantillonnage des déploiements"),
            textInput(ns("labelx_hist"), label="Légende axe x", value= "Temps"),
            textInput(ns("labely_hist"), label="Légende axe y", value= "Déploiements")
          )
        } else if (selected_analysis() == "Effort d'échantillonnage") {
          tagList(
            textInput(ns("title"), label="Titre", value="Effort d'échantillonnage"),
            textInput(ns("label_x"), label="Légende axe x", value= "Temps"),
            textInput(ns("label_y"), label="Légende axe y", value= "Nombre de déploiments actifs")
          )
        }
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
          label_y <- if (isTRUE(params()$show_abundance)) "Pourcentage" else "Nombre estimé"
          
          tagList(
            textInput(ns("title"), label="Titre", value= "Abondance"),
            textInput(ns("label_x"), label="Légende axe x", value= "Taux de détection"),
            textInput(ns("label_y"), label="Légende axe y", value= label_y)
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
      } else if (analysis_type() == "activity") {
        list(
          textInput(ns("title"), label="Titre", value="Modèle d'activité - "),
          textInput(ns("label_x"), label="Légende axe x", value= "Heures"),
          textInput(ns("label_y"), label="Légende axe y", value= "Densité d'activité")
        )
      }
    })
    
    export <- reactive({
      req(analysis_type(), selected_analysis())
      
      if (analysis_type() == "monitoring") {
        if (selected_analysis() == "Historique d'échantillonnage") {
          list(
            title_hist = input$title_hist %||% "Historique d'échantillonnage des déploiements",
            labelx_hist = input$labelx_hist %||% "Temps",
            labely_hist = input$labely_hist %||% "Déploiements"
          )
        } else if (selected_analysis() == "Effort d'échantillonnage") {
          list(
            title = input$title %||% "Effort d'échantillonnage",
            label_x = input$label_x %||% "Temps",
            label_y = input$label_y %||% "Nombre de dispositifs actifs"
          )
        }
      } else if (analysis_type() == "community") {
        if (selected_analysis() == "Abondance") {
            list(
              title = input$title %||% "Abondance",
              label_x = input$label_x %||% "Mois",
              label_y = input$label_y %||% "Pourcentage",
              show_abundance = isTRUE(params()$show_abundance)
            )
        }
      } else if (analysis_type() == "species") {
        if (selected_analysis() == "Taux de détection") {
          list(
            title = input$title %||% "Taux de détection par espèce",
            label_x = input$label_x %||% "Taux de détection",
            label_y = input$label_y %||% "Espèces"
          )
        } else if (selected_analysis() == "species YYY") {
          list(
            title = input$title %||% "Nombre d'évènements photographiques par espèce",
            label_x = input$label_x %||% "Nombre d'évènements photographiques",
            label_y = input$label_y %||% "Espèces"
          )
        }
      } else if (analysis_type() == "activity"){
        list(
          title = input$title %||% "Modèle d'activité - ",
          label_x = input$label_x %||% "Heures",
          label_y = input$label_y %||% "Densité d'activité"
        )
      }
    })
    return(export)
  })
}