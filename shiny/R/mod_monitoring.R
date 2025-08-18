mod_monitoring_ui <- function(id) {
  ns <- NS(id)
  tagList(
    textOutput(ns("nb_EP")),
    textOutput(ns("nb_trap_days_estimated")),
    textOutput(ns("nb_trap_days_real")),
    plotOutput(ns("plot"))
  )
}

mod_monitoring_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage") {
        sample_historic(df, start_date = params()$start_date, end_date = params()$end_date, display = params()$show_observation, species = params()$species_select)
      } else if (selected_analysis() == "Effort d'échantillonnage") {
        boxplot(df$number, main = "Boxplot", col = "lightgreen")
      }
    })
    output$nb_EP <- renderText({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage"){
        nb_EP(df, params()$interval_ind)
      }
    })
    
    output$nb_trap_days_estimated <- renderText({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage"){
        nb_trap_days_estimated(df, start_date = params()$start_date, end_date = params()$end_date)
      }
    })
    
    output$nb_trap_days_real <- renderText({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Historique d'échantillonnage"){
        nb_trap_days_real(df, start_date = params()$start_date, end_date = params()$end_date)
      }
    })
  })
}