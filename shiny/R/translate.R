

translate <- function(text){
  
  periode_dict <- c(
    "year" = "année",
    "quarter" = "trimestre",
    "month" = "mois",
    "week" = "semaine",
    "day" = "jour"
  )
  
  periode_fr <- ifelse(text %in% names(periode_dict), periode_dict[[text]], text)
  
}
