mod_species_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_species_server <- function(id, selected_analysis, data, params) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params())
      df <- data()
      if (selected_analysis() == "Taux de détection") {
        detection_rate(df, selected_species = params()$species_select, 
                       start_date = params()$start_date, 
                       end_date = params()$end_date, 
                       interval_ind = params()$interval_ind, show_by = params()$show_by)
      } else if (selected_analysis() == "species YYY") {
        plot_EP_species(df, species= params()$species_select, 
                        start_date = params()$start_date, 
                        end_date = params()$end_date, 
                        interval_ind = params()$interval_ind)
      }
    })
  })
}