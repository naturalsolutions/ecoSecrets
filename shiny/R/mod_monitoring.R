mod_monitoring_ui <- function(id) {
  ns <- NS(id)
  tagList(
    textOutput(ns("nb_EP")),
    plotOutput(ns("plot"))
  )
}

mod_monitoring_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage") {
        sample_historic(df, display = params()$show_observation, species = params()$species_select)
      } else if (selected_analysis() == "monitoring YYY") {
        boxplot(df$number, main = "Boxplot", col = "lightgreen")
      }
    })
    output$nb_EP <- renderText({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage"){
        nb_EP(df)
      }
    })
  })
}