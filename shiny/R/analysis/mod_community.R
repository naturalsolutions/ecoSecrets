mod_community_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_community_server <- function(id, selected_analysis, data) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis())
      df <- data()
      if (selected_analysis() == "community XXX") {
        plot(df$value, sin(df$value), main = "Scatter", col = "green", pch = 16)
      } else if (selected_analysis() == "community YYY") {
        barplot(table(cut(df$value, 5)), main = "Barplot", col = "yellow")
      }
    })
  })
}