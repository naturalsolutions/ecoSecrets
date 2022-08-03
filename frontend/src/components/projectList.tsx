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
    >
      {statsProject.map((p) => (
        <Card sx={{ width: 450 }}>
          <CardHeader
          
            avatar = {testStatus(p.status)}
            
              title={
                <Link to={`/project/${p.name}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
                  {p.name}
                </Link>
              }
           
            subheader={(p.medias === 0 ? "Pas de médias" : p.medias + ' médias')}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
          />
          <CardContent>
            <Typography variant="body1" gutterBottom>
              <NaturePeopleIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
              {(p.Deploiements === 0 ? "Aucun déploiement" : 'Déploiements : ' + p.Deploiements )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <LocationOnIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
              {(p.Sites === 0 ? "Aucun site" : 'Sites : ' + p.Sites )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <PhotoCameraIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
              {(p.Dispositifs === 0 ? "Aucun dispositif" : (p.Dispositifs === 1 ? 'Dispositif : ' + p.Dispositifs : 'Dispositifs : '+ p.Dispositifs ))}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <EmojiNatureIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
              {(p.espece === '' ? "Etude de communauté" : 'Espèce cible : '+ p.espece )}
            </Typography>
            <Typography variant="body1" gutterBottom >
              < NotesIcon style={{verticalAlign:"middle", minWidth: '40px'}}/>
              {("Annotation : " + p.Annotation + "%")}
            </Typography>
           
          </CardContent>
          <Stack direction='row' justifyContent='center'>

            <Button 
              variant="outlined" 
              size="small"
              aria-label="download"
              component={Link}
              to={`/project/${p.name}`}
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
              to={`/project/${p.name}`}
            >
              <VisibilityIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      ))}
    </Grid>
  );
};
export default ProjectList;
