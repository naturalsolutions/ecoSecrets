#!/usr/bin/env Rscript
# cron_task.R

# Load required libraries
library(DBI)
library(RPostgres)
library(readr) # For writing CSV

# Function to log messages
log_message <- function(message) {
  cat(paste(Sys.time(), " - ", message, "\n"), file = "/home/app/cron_output.txt", append = TRUE)
}

# Log start of execution
log_message("Starting cron job execution")

# Get credentials from environment variables
db_name <- Sys.getenv("DB_NAME", "annotation")
db_host <- Sys.getenv("DB_HOST", "db")
db_user <- Sys.getenv("DB_USER", "dbuser")
db_password <- Sys.getenv("DB_PASSWORD", "dbpassword")

# Attempt to connect to the database
tryCatch({
  con <- dbConnect(
    RPostgres::Postgres(),
    dbname = db_name,
    host = db_host,
    user = db_user,
    password = db_password
  )
  log_message("Database connection successful")

  # Define the query
  query <- "
    SELECT
      p.name AS project,
      d.name AS device,
      s.name AS site,
      s.latitude AS latitude,
      s.longitude AS longitude,
      dep.name AS deployment,
      f.date::timestamp AS date,
      f.annotations ->> 'id_annotation' AS annotation_id,
      f.annotations ->> 'classe' AS classe,
      f.annotations ->> 'order' AS \"order\",
      f.annotations ->> 'family' AS family,
      f.annotations ->> 'genus' AS genus,
      f.annotations ->> 'species' AS species,
      NULLIF(f.annotations ->> 'number', 'NA')::int AS number,
      f.annotations ->> 'sex' AS sex,
      f.annotations ->> 'life_stage' AS life_stage,
      f.annotations ->> 'behaviour' AS behaviour,
      f.annotations ->> 'biological_state' AS biological_state,
      f.annotations ->> 'temp_max_C' AS temp_max_C,
      f.annotations ->> 'precip_mm' AS precip_mm,
      f.annotations ->> 'comments' AS comments
    FROM public.deployments dep
    JOIN public.projects p ON p.id = dep.project_id
    JOIN public.sites s ON s.id = dep.site_id
    JOIN public.devices d ON d.id = dep.device_id
    LEFT JOIN public.files f ON f.deployment_id = dep.id
  "

  # Execute the query and fetch results
  result <- dbGetQuery(con, query)
  log_message("Query executed successfully")

  # Write results to CSV in the Shiny container
  write_delim(result, "/home/app/export.csv", na = "NA", append = FALSE, delim = ";")
  log_message("Data exported to /home/app/export.csv")

  # Disconnect from the database
  dbDisconnect(con)
  log_message("Database connection closed")

}, error = function(e) {
  # Log any errors
  log_message(paste("Error:", conditionMessage(e)))
  stop("Cron job failed: ", conditionMessage(e))
})

log_message("Cron job execution completed")