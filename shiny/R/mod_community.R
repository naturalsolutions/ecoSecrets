mod_community_ui <- function(id) {
  ns <- NS(id)
  tagList(
    plotOutput(ns("plot"))
  )
}

mod_community_server <- function(id, selected_analysis, data, params, export) {
  moduleServer(id, function(input, output, session) {
    output$plot <- renderPlot({
      req(selected_analysis(),data(), params(), export())
      df <- data()
      
      if (selected_analysis() == "Abondance") {
        barplot_compo_com(df, start_date = params()$start_date, end_date = params()$end_date, taxon = params()$taxon_select, periode = params()$time_select, pourcent = params()$show_abundance, position_type = params()$show_group, show_by = params()$show_by,
                          title = export()$title, label_x = export()$label_x, label_y = export()$label_y)
        
      } else if (selected_analysis() == "Indice de diversité") {
        richness_index(df, start_date = params()$start_date, end_date = params()$end_date, time_res = params()$time_select, taxon_res = params()$taxon_select, richness_index = params()$index_select, show_by = params()$show_by,
                       title = export()$title, label_x = export()$label_x, label_y = export()$label_y)
      }
    })
  })
}