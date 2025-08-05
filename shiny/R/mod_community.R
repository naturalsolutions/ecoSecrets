mod_community_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_community_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(),data(), params())
      df <- data()
      if (selected_analysis() == "community XXX") {
        barplot_compo_com(df)
      } else if (selected_analysis() == "community YYY") {
        barplot(table(cut(df$value, 5)), main = "Barplot", col = "yellow")
      }
    })
  })
}