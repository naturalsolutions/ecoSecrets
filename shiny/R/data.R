library(readr)
library(dplyr)
library(lubridate)

load_data <- function(file_path = "/home/app/export.csv") {
  cat("Checking file existence:", file_path, "\n")
  if (!file.exists(file_path)) {
    cat("Error: file not found:", file_path, "\n")
    warning("file not found: ", file_path)
    return(data.frame())
  }

  cat("Reading CSV file:", file_path, "\n")
  tryCatch({
    dataset <- read.csv2(file_path, stringsAsFactors = FALSE)
    cat("CSV read successfully, rows:", nrow(dataset), "\n")
    dataset <- dataset %>%
      mutate(
        date = as.POSIXct(date, format = "%Y-%m-%dT%H:%M:%SZ", tz = "UTC"),
        date = if_else(year(date) == 2025 & device == "PDS_1", update(date, year = 2024), date)
      )
    cat("Date parsing completed, head of dataset:\n")
    print(head(dataset))
    return(dataset)
  }, error = function(e) {
    cat("Error reading or parsing CSV:", conditionMessage(e), "\n")
    warning("Error reading CSV: ", conditionMessage(e))
    return(data.frame())
  })
}