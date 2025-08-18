mod_activity_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_activity_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "activity XXX") {
        activity_model(df, params()$species_select)
      } else if (selected_analysis() == "activity YYY") {
        
      }
    })
  })
}