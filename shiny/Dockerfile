FROM rocker/shiny

# Install system dependencies, including cron and libpq-dev for RPostgres
RUN apt-get update && apt-get install -y \
    libgdal-dev \
    libgeos-dev \
    libproj-dev \
    libudunits2-dev \
    cron \
    libpq-dev

# Install R packages
RUN R -e "install.packages(c('shiny', 'dplyr', 'readr', 'tidyr', 'shinyWidgets', \
                             'camtrapR', 'overlap', 'ggplot2', 'lubridate', \
                             'vegan', 'rlang', 'data.table', 'tidyverse', \
                             'RPostgres', 'DBI'), \
                             dependencies = TRUE)"

# Create working directory
RUN mkdir /home/app
WORKDIR /home/app

# Copy application files
COPY . /home/app
COPY R /home/app/R
COPY cron_task.R /home/app/cron_task.R

# Create cron script with correct Rscript path
RUN echo '#!/bin/bash' > /home/app/cron_script.sh && \
    echo 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' >> /home/app/cron_script.sh && \
    echo '/usr/local/bin/Rscript /home/app/cron_task.R >> /home/app/cron.log 2>&1' >> /home/app/cron_script.sh && \
    chmod +x /home/app/cron_script.sh

# Configure crontab for shiny user
RUN echo "* * * * * /home/app/cron_script.sh" > /etc/cron.d/my-cron-job && \
    chmod 0644 /etc/cron.d/my-cron-job && \
    crontab -u shiny /etc/cron.d/my-cron-job && \
    crontab -u shiny -l > /home/app/crontab_debug.txt

# Create log file for cron
RUN touch /home/app/cron.log

# Set permissions for /home/app
RUN chown -R shiny:shiny /home/app && \
    chmod -R 775 /home/app

# Copy custom entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Debug: Log Rscript path
RUN which Rscript > /home/app/rscript_path.txt || echo "Rscript not found" > /home/app/rscript_path.txt

# Expose port for Shiny
EXPOSE 8180

# Use custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["Rscript", "app.R"]