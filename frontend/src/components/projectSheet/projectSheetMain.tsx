import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack, Typography, Button, Dialog, DialogTitle, Divider, DialogContent, DialogActions, Alert, AlertTitle} from "@mui/material";
import ProjectDeployments from './projectDeployments';
import ProjectForm from './projectForm';
import ProjectMembers from './projectMembers';
import ProjectInformations from './projectInformations';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {Grid, TextField} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import { ProjectsService } from '../../client';


const ProjectSheet = () => {
    const {projectSheetData, setCurrentProject} = useMainContext();
    
    let params = useParams();
    useEffect(() => {
        (async () => {
            console.log(params)
        setCurrentProject(Number(params.projectId));
        })();
    }, []);

    return (
        projectSheetData ?
        <Stack 
            direction="column"
            spacing={5}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar variant="dense">
                    <Grid container>
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                            {projectSheetData.name}
                        </Typography>
                    </Grid>
                        <IconButton aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <CloudDownloadIcon />
                        </IconButton>
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <CloudUploadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>

            <ProjectInformations/>
            <ProjectMembers/>
            <Stack spacing={3}>
                <Stack
                        direction='row'
                        justifyContent='space-between'
                        spacing={5}
                    >
                        <Typography variant="h4" color="#000000" component="div">
                            Déploiements ({projectSheetData.deployments.length})
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<AddCircleIcon />} 
                            color='secondary'
                            component={Link}
                            to={`/deployment/new`}
                        >
                            Ajouter un déploiement
                        </Button>
                    </Stack>
                    <ProjectDeployments/>
            </Stack>
            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Typography variant="h4" color="#000000" component="div">
                    Zone d'étude
                </Typography>
                <Grid container justifyContent="center" alignItems='center'>
                    <Grid item justifyContent="center" height={400} width={1000} spacing={1} style={{backgroundColor: "#D9D9D9"}}>
                        {/* Image du projet ou dropzone */}
                        <Typography variant="subtitle1">
                            Prochainement un carte avec zone d'étude et sites de déploiement
                        </Typography>
                    </Grid>
                </Grid>
                
            </Stack>
            <Stack>
                <Typography variant="h4" color="#000000" component="div">
                    Fiche projet
                </Typography>
                < ProjectForm/>
            </Stack>
        </Stack> : 
            <Alert severity="error" >
                <AlertTitle>Erreur</AlertTitle>
                    Ce projet n'existe pas !
            </Alert>
    );
};
export default ProjectSheet;
