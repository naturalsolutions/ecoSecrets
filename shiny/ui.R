ui <- fluidPage(
  # Tabs to select analysis type
  tabsetPanel(
    id = "main_tabs",
    selected = "monitoring",
    tabPanel("Suivi photographique", value="monitoring"),
    tabPanel("Structure communautés", value="community"),
    tabPanel("Présence espèces", value="species"),
    tabPanel("Activité & Comportement", value="activity")
  ),

  # Select to choose the analysis
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
      width = 4,
      # Left menu
      tabsetPanel(
        id = "side_tabs",
        type = "pills",
        tabPanel("Données",
                 mod_data_prep_ui("data_prep")
        ),
        tabPanel("Paramétrages",
                 mod_display_params_ui("display_params")
        ),
        tabPanel("Export",
                 mod_export_ui("export")
        )
      )
    ),

    # Data visualization
    column(
      width = 8,
      uiOutput("data_warning"), # Add warning for no data
      uiOutput("dynamic_module_ui")
    )
  )
)