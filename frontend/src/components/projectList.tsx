import { Grid, Typography, Stack, TextField, IconButton, Box } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from "./projectCard";
import ProjectModal from "./projectModale";



const ProjectList = () => {
  const { projectsStats } = useMainContext();

  return (
    <Grid container >
       <Box
        component="form"
        sx={{
          width:2000,
          '& .MuiTextField-root': { m: 1},
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
              Mes projets
            </Typography>
            <ProjectModal page='home'/>
          </Stack>
        </div>
   
        <div className="filter">
          <TextField
            fullWidth
            select
            id="outlined-required"
            label="Projet"
            defaultValue="Rechercher"
            variant="outlined" 
            type="search"
          />
        
        <TextField
            select
            fullWidth
            id="outlined-required"
            label="Espèce cible"
            defaultValue="Rechercher"
            variant="outlined" 
            type="search"
          />
          <TextField
            select
            fullWidth
            id="outlined-required"
            label="Année de début"
            defaultValue="Rechercher"
            variant="outlined" 
            type="search"
          />
          <TextField
            select
            fullWidth
            id="outlined-required"
            label="Statut"
            defaultValue="Rechercher"
            variant="outlined" 
            type="search"
          />
          <IconButton
          >
                <SearchIcon/>
          </IconButton>
        </div>
      </Box>

      <Grid 
        container 
        direction="row"
        spacing={2}
      >
        {projectsStats && projectsStats.map((s) => (
          <Grid 
            item 
            xs={12} sm={6} md={6} lg={3} 
            key={projectsStats.indexOf(s)}
          >
            <ProjectCard selectedProject={s}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default ProjectList;
