mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    selectInput(ns("project_select"), "Choix du projet :", choices = unique(dataset$project), selected = "ecopont"),
    selectInput(ns("site_select"), "Choix du site :", choices = NULL, selected = NULL, multiple = TRUE),
    selectInput(ns("deployment_select"), "Choix du déploiement :", choices = NULL, selected = NULL, multiple = TRUE),
    checkboxInput(ns("empty_select"),"Retirer les élements vides", value = FALSE),
    checkboxInput(ns("human_select"),"Retirer les humains", value = FALSE)
    )
}

mod_data_prep_server <- function(id) {
  moduleServer(id, function(input, output, session) {
      ns <- session$ns
      
      observeEvent(input$project_select, {
        req(input$project_select)
        
        sites <- dataset %>%
          filter(project == input$project_select) %>%
          pull(site) %>%
          unique()
        
        deployments <- dataset %>%
          filter(project == input$project_select) %>%
          pull(deployment) %>%
          unique()
        
        updateSelectInput(session, "site_select", choices = sort(sites), selected = NULL)
        updateSelectInput(session,"deployment_select", choices = sort(deployments), selected = NULL)
      })
        
      observeEvent (input$site_select, {
        
        if(is.null(input$site_select)) {
          deployments <- dataset %>%
            filter(project == input$project_select) %>%
            pull(deployment) %>%
            unique()
        } else {
            deployments <- dataset %>%
            filter(project == input$project_select & site == input$site_select) %>%
            pull(deployment) %>%
            unique()
        }
        updateSelectInput(session,"deployment_select", choices = c("",sort(deployments)), selected = input$deployment_select)
      }, ignoreNULL = FALSE)
      
      observeEvent (input$deployment_select, {
        
        if(is.null(input$deployment_select)) {
          sites <- dataset %>%
            filter(project == input$project_select) %>%
            pull(site) %>%
            unique()
        } else {
          sites <- dataset %>%
            filter(project == input$project_select & deployment == input$deployment_select) %>%
            pull(site) %>%
            unique()
        }
        
        updateSelectInput(session, "site_select", choices = c("", sort(sites)), selected = input$site_select)
      }, ignoreNULL = FALSE)
      
      data <- reactive({
        req(input$project_select)
        
        df <- dplyr::filter(dataset, project == input$project_select)
        
        if(!is.null(input$site_select)){
          df <- dplyr::filter(df, site %in% input$site_select)
        }
        
        if (!is.null(input$deployment_select)){
          df <- dplyr::filter(df, deployment %in% input$deployment_select)
        }
        
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