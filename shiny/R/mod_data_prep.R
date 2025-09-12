library(shinyWidgets)
library(dplyr)

mod_data_prep_ui <- function(id) {
  ns <- NS(id)
  tagList(
    selectInput(ns("project_select"), "Projet :", choices = NULL, selected = NULL),
    pickerInput(ns("site_select"), "Site :", choices = NULL, selected = NULL, multiple = TRUE, options = pickerOptions(
      actionsBox = TRUE,
      noneSelectedText = "Aucun site sélectionné",
      selectedTextFormat = "count > 1",
      countSelectedText = "{0} sites sélectionnés"
    )),
    pickerInput(ns("deployment_select"), "Déploiement :", choices = NULL, selected = NULL, multiple = TRUE, options = pickerOptions(
      actionsBox = TRUE,
      noneSelectedText = "Aucun déploiement sélectionné",
      selectedTextFormat = "count > 1",
      countSelectedText = "{0} déploiements sélectionnés"
    )),
    checkboxInput(ns("empty_select"), "Retirer les élements vides", value = FALSE),
    checkboxInput(ns("human_select"), "Retirer les humains", value = FALSE)
  )
}

mod_data_prep_server <- function(id, data) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    observe({
      req(data())
      cat("Updating project_select\n")
      projects <- if (nrow(data()) > 0) sort(unique(data()$project)) else character(0)
      cat("Available projects:\n")
      print(projects)
      updateSelectInput(session, "project_select", choices = projects, selected = projects[1] %||% NULL)
    })

    observeEvent(input$project_select, {
      req(input$project_select, data())
      cat("Updating site_select\n")
      df <- data()
      sites <- if (nrow(df) > 0) {
        df %>% filter(project == input$project_select) %>% pull(site) %>% unique() %>% sort()
      } else {
        character(0)
      }
      cat("Available sites:\n")
      print(sites)
      updatePickerInput(session, "site_select", choices = sites, selected = sites)
    })

    observeEvent(list(input$project_select, input$site_select), {
      req(input$project_select, data())
      cat("Updating deployment_select\n")
      df <- data() %>% filter(project == input$project_select)
      if (!is.null(input$site_select)) {
        df <- df %>% filter(site %in% input$site_select)
      }
      deployments <- if (nrow(df) > 0) {
        df %>% pull(deployment) %>% unique() %>% sort()
      } else {
        character(0)
      }
      cat("Available deployments:\n")
      print(deployments)
      updatePickerInput(session, "deployment_select", choices = deployments, selected = deployments)
    }, ignoreNULL = FALSE)

    filtered_data <- reactive({
      req(input$project_select, data())
      cat("Filtering data\n")
      df <- data()
      cat("Data before filtering:\n")
      print(head(df))
      df <- df %>% filter(project == input$project_select)
      cat("After project filter:\n")
      print(head(df))

      if (!is.null(input$site_select)) {
        df <- df %>% filter(site %in% input$site_select)
        cat("After site filter:\n")
        print(head(df))
      }

      if (!is.null(input$deployment_select)) {
        df <- df %>% filter(deployment %in% input$deployment_select)
        cat("After deployment filter:\n")
        print(head(df))
      }

      if (isTRUE(input$empty_select)) {
        df <- df %>% filter(classe != "")
        cat("After empty filter:\n")
        print(head(df))
      }

      if (isTRUE(input$human_select)) {
        df <- df %>% filter(species != "Homo sapiens")
        cat("After human filter:\n")
        print(head(df))
      }

      cat("Final filtered data:\n")
      print(head(df))
      cat("Final filtered data dimensions:\n")
      print(dim(df))
      return(df)
    })

    return(filtered_data)
  })
}

`%||%` <- function(a, b) if (!is.null(a)) a else b