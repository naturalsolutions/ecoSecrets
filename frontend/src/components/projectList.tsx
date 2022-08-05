import { Card, CardMedia, CardContent, CardHeader, Grid, Typography, Avatar, Stack, Button } from "@mui/material";
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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

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
  const { projectsStats } = useMainContext();

  return (
    <Grid 
      container 
      direction="row"
      spacing={2}
    >
      {projectsStats && projectsStats.map((s) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={3} 
          lg={3} 
          key={projectsStats.indexOf(s)}
        >

          <Card>
            <CardHeader
            
              avatar = {testStatus(s.status)}
              
                title={
                  <Link to={`/project/${s.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
                    {s.name}
                  </Link>
                }
            
              subheader={(s.media_number === 0 ? "Pas de médias" : s.media_number + ' médias')}
            />
            <CardMedia
              component="img"
              height="194"
              image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <NaturePeopleIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.deployment_number === 0 ? "Aucun déploiement" : 'Déploiements : ' + s.deployment_number )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocationOnIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.site_number === 0 ? "Aucun site" : 'Sites : ' + s.site_number )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <PhotoCameraIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.device_number === 0 ? "Aucun dispositif" : (s.device_number === 1 ? 'Dispositif : ' + s.device_number : 'Dispositifs : '+ s.device_number ))}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <EmojiNatureIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.targeted_species === '' ? "Etude de communauté" : 'Espèce cible : '+ s.targeted_species )}
              </Typography>
              <Typography variant="body1" gutterBottom >
                < NotesIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {("Annotation : " + s.annotation_percentage + "%")}
              </Typography>
            
            </CardContent>
            <Stack direction='row' justifyContent='center'>

              <Button 
                variant="outlined" 
                size="small"
                aria-label="download"
                component={Link}
                to={`/project/${s.id}`}
              >
                <CloudDownloadIcon style={{verticalAlign:"baseline", minWidth: '40px'}}/>
                <Typography variant="overline">Import médias</Typography>
              </Button>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default ProjectList;
