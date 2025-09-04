# Base R Shiny image
FROM rocker/shiny

RUN apt-get update && apt-get install -y \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    libudunits2-dev

RUN R -e "install.packages(c('shiny', 'dplyr', 'readr', 'tidyr', 'shinyWidgets', \
                             'camtrapR', 'overlap', 'ggplot2', 'lubridate', \
                             'vegan', 'rlang', 'data.table', 'tidyverse'), \
                             dependencies = TRUE)"

# Make a directory in the container
RUN mkdir /home/app

WORKDIR /home/app

# Copy the Shiny app code
COPY . /home/app
COPY R /home/app/R

# Expose the application port
EXPOSE 8180

# Run the R Shiny app
CMD Rscript app.R