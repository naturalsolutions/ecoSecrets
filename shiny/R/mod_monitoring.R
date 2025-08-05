mod_monitoring_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_monitoring_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "monitoring XXX") {
        sample_historic(df, display = params()$show_observation, species = params()$species_select)
      } else if (selected_analysis() == "monitoring YYY") {
        boxplot(df$number, main = "Boxplot", col = "lightgreen")
      }
    })
  })
}