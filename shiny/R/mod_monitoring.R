mod_monitoring_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_monitoring_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), params())
      df <- data()
      if (selected_analysis() == "monitoring XXX") {
        hist(df$number, main = "Histogramme", col = params()$color)
      } else if (selected_analysis() == "monitoring YYY") {
        boxplot(df$number, main = "Boxplot", col = "lightgreen")
      }
    })
  })
}