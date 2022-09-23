import { Card, CardMedia, CardContent, CardHeader, Typography, Avatar, IconButton, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import NotesIcon from '@mui/icons-material/Notes';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddIcon from '@mui/icons-material/Add';
import ImportModale from "./importModale";
import { useState } from "react";
import GoAnnotation from "./goAnnotation";

const testStatus = (status) => {
    if (status === 'Terminé') {
        return(
            <Avatar sx={{ bgcolor: '#8BD3BB' }} aria-label="status">
                <CheckIcon/>
            </Avatar>
    )};
    if (status === 'A annoter'){
      return(
        <Avatar sx={{ bgcolor: '#FF9B9B' }} aria-label="status">
            <HourglassBottomIcon/>
        </Avatar>
    )};
    if (status === 'En cours'){
      return(
        <Avatar sx={{ bgcolor: '#FFB876' }} aria-label="status">
            <HourglassBottomIcon/>
        </Avatar>
    )};
    if(status === 'A venir'){
      return(
        <Avatar sx={{ bgcolor: '#FAEF8D' }} aria-label="status">
            <AccessTimeIcon/>
        </Avatar>
    )};
    
    return (
        <Avatar sx={{ bgcolor: '#ed213c' }} aria-label="status">
            <WarningAmberRoundedIcon/>
        </Avatar>
)};

const ProjectCard = (props) => {
    const [openImport, setOpenImport] = useState(false);
    const openImportModale = (id: number) => {
        setOpenImport(true);
    };
    const closeImportModale = () => {
        setOpenImport(false);
    };

    return(
        <Card>
            <ImportModale 
                  open={openImport} 
                  close={closeImportModale}
                  projectIsSet={true}
                  projectId={props.selectedProject.id}
            />

            <CardHeader
                avatar = {testStatus(props.selectedProject.status)}
                title={
                    <Link to={`/projectsheet/${props.selectedProject.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
                    {props.selectedProject.name}
                    </Link>
                }
                subheader={( 
                    (props.selectedProject.start_date === null || props.selectedProject.end_date === null )
                    ? "Pas de période renseignée" 
                    : props.selectedProject.start_date + ' / ' + props.selectedProject.end_date 
                )}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
            />

            <CardContent>

                <ListItem 
                    secondaryAction={
                        <IconButton 
                        edge="end" 
                        aria-label="add"
                        onClick={() => openImportModale(props.selectedProject.id)}
                        >
                        <AddIcon/>
                        </IconButton>
                    }
                >
                    <Typography variant="body1" gutterBottom>
                        <CollectionsIcon 
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {(
                            props.selectedProject.media_number === 0 
                            ? "Aucun médias" 
                            : 'Médias : ' + props.selectedProject.media_number 
                        )}
                    </Typography>
                </ListItem>

                <ListItem>
                    <Typography variant="body1" gutterBottom>
                        <NaturePeopleIcon
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {(
                            props.selectedProject.deployment_number === 0 
                            ? "Aucun déploiement" 
                            : 'Déploiements : ' + props.selectedProject.deployment_number 
                        )}
                    </Typography>
                </ListItem>
                
                <ListItem>
                    <Typography variant="body1" gutterBottom>
                        <LocationOnIcon 
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {(
                            props.selectedProject.site_number === 0 
                            ? "Aucun site" 
                            : 'Sites : ' + props.selectedProject.site_number 
                            )}
                    </Typography>
                </ListItem>
                
                <ListItem>
                    <Typography variant="body1" gutterBottom>
                        <PhotoCameraIcon 
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {(
                            props.selectedProject.device_number === 0 
                            ? "Aucun dispositif" 
                            : (
                                props.selectedProject.device_number === 1 
                                ? 'Dispositif : ' + props.selectedProject.device_number 
                                : 'Dispositifs : '+ props.selectedProject.device_number 
                            )
                        )}
                    </Typography>
                </ListItem>
                
                <ListItem>
                    <Typography variant="body1" gutterBottom>
                        <EmojiNatureIcon 
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {(
                            props.selectedProject.targeted_species === null 
                            ? "Etude de communauté" 
                            : 'Espèce cible : '+ props.selectedProject.targeted_species 
                        )}
                    </Typography>
                </ListItem>
                
                <ListItem secondaryAction={
                        <GoAnnotation 
                            project_id={props.selectedProject.id} 
                            nb_media={props.selectedProject.media_number} 
                            annotation_percentage={props.selectedProject.annotation_percentage} 
                            page='home'
                        />
                    }>
                    <Typography variant="body1" gutterBottom >
                        < NotesIcon 
                            style={{verticalAlign:"middle", minWidth: '40px'}}
                        />
                        {("Annotation : " + props.selectedProject.annotation_percentage + "%")}
                    </Typography>
                </ListItem>
            </CardContent>
        </Card>
)};

export default ProjectCard;