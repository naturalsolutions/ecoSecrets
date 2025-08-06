mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    selectInput(ns("project_select"), "Choix du projet :", choices = unique(dataset$project), selected = "ecopont"),
    selectInput(ns("site_select"), "Choix du site :", choices = NULL, multiple = TRUE),
    selectInput(ns("deployment_select"), "Choix du déploiement :", choices = NULL),
    checkboxInput(ns("empty_select"),"Retirer les élements vides", value = FALSE),
    checkboxInput(ns("human_select"),"Retirer les humains", value = FALSE)
    )
}

mod_data_prep_server <- function(id) {
  moduleServer(id, function(input, output, session) {
      ns <- session$ns
      
      observeEvent(
        {input$project_select
        }, 
      
      {req(input$project_select)
      
      sites <- dataset %>%
        filter(project == input$project_select) %>%
        pull(site) %>%
        unique()
      
      updateSelectInput(session, "site_select", choices = c("",sites), selected = NULL)
    })
      
    observeEvent ({
      input$site_select
    }, {
      req(input$site_select)
      
    deployments <- dataset %>%
      filter(site == input$site_select) %>%
      pull(deployment) %>%
      unique()
    
    updateSelectInput(session,"deployment_select", choices = deployments, selected = deployments[1])
    })
      
      data <- reactive({
        req(input$project_select, input$site_select, input$deployment_select)
        
        df <- dplyr::filter(dataset, project == input$project_select, site == input$site_select, deployment == input$deployment_select)
      
        if (isTRUE(input$empty_select)) {
          df <- dplyr::filter(df, classe != "")
        }
  
        if (isTRUE(input$human_select)) {
          df <- dplyr::filter(df, species != "Homo sapiens")
        }

        return(df)
    })
    return(data)
  })
}