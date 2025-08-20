mod_species_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_species_server <- function(id, selected_analysis, data, params, export) {
  moduleServer(id, function(input, output, session) {
    
    output$plot <- renderPlot({
      req(selected_analysis(), data(), params(), export())
      df <- data()
      if (selected_analysis() == "Taux de détection") {
        detection_rate(df, selected_species = params()$species_select, 
                       start_date = params()$start_date, 
                       end_date = params()$end_date, 
                       interval_ind = params()$interval_ind, 
                       show_by = params()$show_by,
                       title = export()$title,
                       label_x = export()$label_x,
                       label_y = export()$label_y
                       )
      } else if (selected_analysis() == "species YYY") {
        plot_EP_species(df, selected_species= params()$species_select, 
                        start_date = params()$start_date, 
                        end_date = params()$end_date, 
                        interval_ind = params()$interval_ind, 
                        show_by = params()$show_by,
                        title = export()$title,
                        label_x = export()$label_x,
                        label_y = export()$label_y)
      }
    })
  })
}