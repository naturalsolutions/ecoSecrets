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
      list(
        title = input$title %||% NULL,
        label_x = input$label_x %||% NULL,
        label_y = input$label_y%||% NULL
      )
    })
    return(export)
  })
}