mod_activity_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_activity_server <- function(id, selected_analysis, data, params, export) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params(), export())
      df <- data()
      if (selected_analysis() == "Modèle d'activité") {
        activity_model_cross(df, params()$species1_select, params()$species2_select, 
                             title= export()$title, label_x=export()$label_x, label_y = export()$label_y)
      }
    })
  })
}