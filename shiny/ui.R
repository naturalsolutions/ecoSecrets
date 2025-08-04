ui <- fluidPage(
  # Tabs to select analyse type
  tabsetPanel(
    id = "main_tabs",
    selected = "monitoring",
    tabPanel("Suivi photographique", value="monitoring"),
    tabPanel("Composition communautés", value="community"),
    tabPanel("Présence espèces", value="species"),
    
  ),
  
  # Select to choose the analyse
  fluidRow(
    column(3),
    column(6, align = "center",
           selectInput("main_select", NULL, choices = NULL)
    ),
    column(3)
  ),
  
  # Main panel
  fluidRow(
    column(
      width = 3,
      # Left menu
      tabsetPanel(
        id = "side_tabs",
        type = "pills",
        tabPanel("Données",
                 mod_data_prep_ui("data_prep")
        ),
        tabPanel("Export",
                 mod_display_params_ui("display_params")
        )
      )
    ),
    
    # Data visualisation
    column(
      width = 9,
      uiOutput("dynamic_module_ui")
    )
  )
)