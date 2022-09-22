import { Card, CardMedia, CardContent, CardHeader, Grid, Typography, Avatar, Stack, TextField, IconButton, Box, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import NotesIcon from '@mui/icons-material/Notes';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddIcon from '@mui/icons-material/Add';
import ProjectModal from "./projectModale";
import GoAnnotation from "./goAnnotation";

const testStatus = (status) => {
  if (status === 'Terminé') {
    return(
      <Avatar sx={{ bgcolor: '#8BD3BB' }} aria-label="status">
        <CheckIcon/>
      </Avatar>
    )
  }
  if (status === 'A annoter'){
    return(
      <Avatar sx={{ bgcolor: '#FF9B9B' }} aria-label="status">
          <HourglassBottomIcon/>
      </Avatar>
    )
  }
  if (status === 'En cours'){
    return(
      <Avatar sx={{ bgcolor: '#FFB876' }} aria-label="status">
          <HourglassBottomIcon/>
      </Avatar>
    )
  }
  if(status === 'A venir'){
    return(
      <Avatar sx={{ bgcolor: '#FAEF8D' }} aria-label="status">
          <AccessTimeIcon/>
      </Avatar>
    )
  }
  //Pop-d'erreur et afficher le statut
  return (
    <Avatar sx={{ bgcolor: '#ed213c' }} aria-label="status">
        <WarningAmberRoundedIcon/>
    </Avatar>
  )
};

const ProjectList = () => {
  const { projectsStats} = useMainContext();
  
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
          <Card>
            <CardHeader
              avatar = {testStatus(s.status)}
              title={
                <Link to={`/projectsheet/${s.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
                  {s.name}
                </Link>
              }
              subheader={( (s.start_date === null || s.end_date === null )? "Pas de période renseignée" : s.start_date + ' / ' + s.end_date )}
            />
            <CardMedia
              component="img"
              height="194"
              image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
            />
            <CardContent>

            <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="add">
                      <AddIcon/>
                    </IconButton>
                  }>
                <Typography variant="body1" gutterBottom>
                  <CollectionsIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {(s.media_number === 0 ? "Aucun médias" : 'Médias : ' + s.media_number )}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" gutterBottom>
                  <NaturePeopleIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {(s.deployment_number === 0 ? "Aucun déploiement" : 'Déploiements : ' + s.deployment_number )}
                </Typography>
              </ListItem>
              
              <ListItem>
                <Typography variant="body1" gutterBottom>
                  <LocationOnIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {(s.site_number === 0 ? "Aucun site" : 'Sites : ' + s.site_number )}
                </Typography>
              </ListItem>
              
              <ListItem>
                <Typography variant="body1" gutterBottom>
                  <PhotoCameraIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {(s.device_number === 0 ? "Aucun dispositif" : (s.device_number === 1 ? 'Dispositif : ' + s.device_number : 'Dispositifs : '+ s.device_number ))}
                </Typography>
              </ListItem>
              
              <ListItem>
                <Typography variant="body1" gutterBottom>
                  <EmojiNatureIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {(s.targeted_species === null ? "Etude de communauté" : 'Espèce cible : '+ s.targeted_species )}
                </Typography>
              </ListItem>
              
              <ListItem secondaryAction={
                    <GoAnnotation project_id={s.id} nb_media={s.media_number} annotation_percentage={s.annotation_percentage} page='home'/>
                  }>
                <Typography variant="body1" gutterBottom >
                  < NotesIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                  {("Annotation : " + s.annotation_percentage + "%")}
                </Typography>
              </ListItem>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Grid>
  );
};
export default ProjectList;
