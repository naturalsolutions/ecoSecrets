import { Card, CardMedia, CardContent, CardHeader, Divider, Grid, CardActions, IconButton, Typography, Avatar, Stack, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import NotesIcon from '@mui/icons-material/Notes';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import CheckIcon from '@mui/icons-material/Check';
import {green } from '@mui/material/colors';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const ProjectList = () => {
  // const { projects } = useMainContext();
  const statsProject = [
    {
      'id': 1,
      'name' : 'First Project',
      'status':'A venir',
      'medias' : 0,
      'Deploiements' : 10,
      'Sites' : 6,
      'Dispositifs': 5,
      'espece': 'Loup',
      'Annotation': 80
    },
    {
      'id': 2,
      'name' : 'Second Project',
      'status': 'En cours',
      'medias' : 1500,
      'Deploiements' : 12,
      'Sites' : 4,
      'Dispositifs': 5,
      'espece': 'Coccinelle',
      'Annotation': 80
    },
    {
      'id': 3,
      'name' : 'Thrid Project',
      'status' :'A annoter',
      'medias' : 500,
      'Deploiements' : 0,
      'Sites' : 6,
      'Dispositifs': 1,
      'espece': 'Chevreuil',
      'Annotation': 80
    },
    {
      'id': 4,
      'name' : 'Fourth Project',
      'status' : 'Terminé',
      'medias' : 624,
      'Deploiements' : 8,
      'Sites' : 5,
      'Dispositifs': 5,
      'espece': '',
      'Annotation': 80
    }
  ]

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
    return ('Statut non valide')
  };

  return (
    <Grid 
      container 
      direction="row"
      spacing={2}
    >
      {statsProject.map((s) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={3} 
          lg={2} 
          key={statsProject.indexOf(s)}
        >

          <Card>
            <CardHeader
            
              avatar = {testStatus(s.status)}
              
                title={
                  <Link to={`/project/${s.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
                    {s.name}
                  </Link>
                }
            
              subheader={(s.medias === 0 ? "Pas de médias" : s.medias + ' médias')}
            />
            <CardMedia
              component="img"
              height="194"
              image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
            />
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <NaturePeopleIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.Deploiements === 0 ? "Aucun déploiement" : 'Déploiements : ' + s.Deploiements )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <LocationOnIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.Sites === 0 ? "Aucun site" : 'Sites : ' + s.Sites )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <PhotoCameraIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.Dispositifs === 0 ? "Aucun dispositif" : (s.Dispositifs === 1 ? 'Dispositif : ' + s.Dispositifs : 'Dispositifs : '+ s.Dispositifs ))}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <EmojiNatureIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {(s.espece === '' ? "Etude de communauté" : 'Espèce cible : '+ s.espece )}
              </Typography>
              <Typography variant="body1" gutterBottom >
                < NotesIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
                {("Annotation : " + s.Annotation + "%")}
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
                <Typography variant="overline">import médias</Typography>
              </Button>
              
            </Stack>
            {/* <CardActions disableSpacing>
              <IconButton 
                aria-label="Import data" 
              >
                <DownloadIcon />
              </IconButton>
              <IconButton 
                aria-label="Inspect project"
                component={Link}
                to={`/project/${s.name}`}
              >
                <VisibilityIcon />
              </IconButton>
            </CardActions> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default ProjectList;
