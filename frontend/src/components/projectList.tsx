import { Grid, Typography, Stack, Box } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";
import ProjectCard from "./projectCard";
import ProjectModal from "./projectModale";
import { useTranslation } from "react-i18next";
import { capitalize } from "@mui/material";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const { projectsStats, setCurrentProject } = useMainContext();
  const { t } = useTranslation();

 
  return (
    <Grid container >
      <Box
        component="form"
        sx={{
          width: 2000,
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={5}
          >
            <Typography variant="h4" gutterBottom component="div">
              { capitalize(t("main.my_projects")) }
            </Typography>
            <ProjectModal page='home' />
          </Stack>
        </div>
      </Box>

      <Grid
        container
        direction="row"
        spacing={2}
      >
        {projectsStats && projectsStats.map((s, k) => 
        (
          <Grid
            item
            xs={12} sm={6} md={6} lg={3}
            key={k}
          >
            <ProjectCard selectedProject={s} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default ProjectList;
