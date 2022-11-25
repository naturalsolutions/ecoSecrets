import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack, Typography, Alert, AlertTitle, Button, capitalize} from "@mui/material";
import ProjectDeployments from './projectDeployments';
import ProjectForm from './projectForm';
import ProjectMembers from './projectMembers';
import ProjectInformations from './projectInformations';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Grid} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import DeploymentCreationModale from '../deploymentCreationModale';
import ImportModale from '../importModale';
import ProjectModal from '../projectModale';
import { useTranslation } from "react-i18next";

const ProjectSheet = () => {
    const {projectSheetData, setCurrentProject} = useMainContext();
    const {t} = useTranslation()

    const [openNewDeployment, setOpenNewDeployment] = useState(false);
    const [load, setload] = useState(true);

    const handleOpenNewDeployment = () => {
        setOpenNewDeployment(true);
    };
    const handleCloseNewDeployment = () => {
        setOpenNewDeployment(false);
    };

    const [openImport, setOpenImport] = useState(false);
    const openImportModale = () => {
        setOpenImport(true);
    };
    const closeImportModale = () => {
        setOpenImport(false);
    };
    
    let params = useParams();


    
    useEffect(() => {
        (async () => {
            await setCurrentProject(Number(params.projectId));
        })();
    }, []);

    // temporary fix project dosen't exist message
    useEffect(() => {
        projectSheetData !== undefined ? setload(false) : setload(true)
    }, [projectSheetData]);

    return (
        load ?

        <Stack 
            direction="column"
            spacing={5}
        >
        </Stack> :

        projectSheetData && !load ?

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
                        <ProjectModal/>
                        <IconButton color="primary" aria-label="menu" sx={{ mr: 2 }}
                        onClick={openImportModale}
                        >
                            <CloudDownloadIcon />
                        </IconButton>
                        <ImportModale 
                            open={openImport} 
                            close={closeImportModale}
                            projectIsSet={true}
                        />
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <CloudUploadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <ProjectInformations/>

            <Stack>
                <Typography variant="h4" color="#000000" component="div">
                    {capitalize(t("projects.sheet"))}
                </Typography>
                < ProjectForm/>
            </Stack>

            <Stack spacing={3}>
                <Stack
                        direction='row'
                        justifyContent='space-between'
                        spacing={5}
                    >
                        <Typography variant="h4" color="#000000" component="div">
                        {`${capitalize(t("deployments.deployments"))}`} ({projectSheetData.deployments.length})
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<AddCircleIcon />} 
                            style={{backgroundColor: "#BCAAA4"}}
                            onClick={handleOpenNewDeployment}
                        >
                            {capitalize(t("projects.new_deploy"))}
                        </Button>
                        <DeploymentCreationModale 
                            openNewDeployment={openNewDeployment}
                            handleCloseNewDeployment={handleCloseNewDeployment}
                        />
                    </Stack>
                    <ProjectDeployments/>
            </Stack>
            
            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Typography variant="h4" color="#000000" component="div">
                    {capitalize(t("projects.studies_area"))}
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

            <ProjectMembers/>

        </Stack> : 
            <Alert severity="error" >
                <AlertTitle>{capitalize(t("projects.error"))}</AlertTitle>
                    <p>{capitalize(t("projects.error_msg"))}</p>
            </Alert>
    );
};
export default ProjectSheet;
