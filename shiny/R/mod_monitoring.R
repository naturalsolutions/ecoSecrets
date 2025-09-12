mod_monitoring_ui <- function(id) {
  ns <- NS(id)
  tagList(
    textOutput(ns("nb_EP")),
    textOutput(ns("nb_trap_days_estimated")),
    textOutput(ns("nb_trap_days_real")),
    plotOutput(ns("plot"))
  )
}

mod_monitoring_server <- function(id, selected_analysis, data, params, export) {
  moduleServer(id, function(input, output, session) {
    cat("Initializing mod_monitoring_server\n")
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params(), export())
      df <- data()
      cat("Monitoring plot data:\n")
      print(head(df))
      cat("Selected analysis:\n")
      print(selected_analysis())
      cat("Params:\n")
      print(params())
      cat("Export:\n")
      print(export())
      if (selected_analysis() == "Historique d'échantillonnage") {
        cat("Rendering sample_historic plot\n")
        sample_historic(df,
                        start_date = params()$start_date,
                        end_date = params()$end_date,
                        display = params()$show_observation,
                        species = params()$species_select,
                        title = export()$title_hist,
                        label_x = export()$labelx_hist,
                        label_y = export()$labely_hist)
      } else if (selected_analysis() == "Effort d'échantillonnage") {
        cat("Rendering boxplot\n")
        boxplot(df$number, main = "Boxplot", col = "lightgreen")
      }
    })
    output$nb_EP <- renderUI({
      req(selected_analysis(), data(), params())
      df <- data()
      cat("Rendering nb_EP\n")
      if (selected_analysis() == "Historique d'échantillonnage") {
        HTML(paste0('<div style="text-align:center;">',
                    "<b>", nb_EP(df, params()$interval_ind), "</b> <br> évènements photographiques",
                    '</div>'))
      }
    })
    output$nb_trap_days_estimated <- renderUI({
      req(selected_analysis(), data(), params())
      df <- data()
      cat("Rendering nb_trap_days_estimated\n")
      if (selected_analysis() == "Historique d'échantillonnage") {
        HTML(paste0('<div style="text-align:center;">',
                    "<b>", nb_trap_days_estimated(df, start_date = params()$start_date, end_date = params()$end_date), "</b> <br> jours échantillonnés théoriques",
                    '</div>'))
      }
    })
    output$nb_trap_days_real <- renderUI({
      req(selected_analysis(), data(), params())
      df <- data()
      cat("Rendering nb_trap_days_real\n")
      if (selected_analysis() == "Historique d'échantillonnage") {
        HTML(paste0('<div style="text-align:center;">',
                    "<b>", nb_trap_days_real(df, start_date = params()$start_date, end_date = params()$end_date), "</b> <br> jours échantillonnés réels",
                    '</div>'))
      }
    })
  })
}