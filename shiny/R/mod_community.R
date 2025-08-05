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
      if (selected_analysis() == "Abondance") {
        barplot_compo_com(df, start_date = params()$start_date, end_date = params()$end_date, taxon = params()$taxon_select, periode = params()$time_select, pourcent = params()$show_abundance, stack = params()$show_group)
      } else if (selected_analysis() == "Indice de diversité") {
        richness_index(df, taxon = params()$taxon_select, richness_index = params()$index_select)
      }
    })
  })
}