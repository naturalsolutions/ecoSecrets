dataset <- read.csv2("R/data/data.csv") %>% 
  mutate(date = as.POSIXct(date, format = "%Y-%m-%d %H:%M:%S"),
         date = if_else(year(date) == 2025 & device == "PDS_1", update(date, year = 2024), date))