import { Card, CardMedia, CardContent, CardHeader, Grid, Typography, Avatar, Stack, Button, TextField, MenuItem, Divider, Dialog,  DialogActions, DialogContent, DialogTitle, IconButton, Collapse, Alert, AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import NotesIcon from '@mui/icons-material/Notes';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from "react";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { ProjectBase, ProjectsService } from "../client";

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
  const { projectsStats, updateProjects, updateGlobalStats } = useMainContext();
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState<ProjectBase>({ name: '', description: '', creation_date: '', protocole: '', targeted_species: '', owner_id: 1, contact_id: 1});
  const[startDate, setStartDate] = useState<Date | null>(null);
  const[endDate, setEndDate] = useState<Date | null>(null);
  const [success, setSuccess] = useState(false);
  const protocoles = ["Protocole A", "Protocole B", "Protocole C"];
  const species = ["Loup", "Coccinelle", "Ours", "Chamois", "Chevreuil", "Cerf", "Marmotte", "Renard", "Aigle"];
  

  const handleClickOpen = () => {
    console.log('click');
    setOpen(true);

  };
  
  const handleClose = () => {
    setOpen(false);
    setProjectData({ name: '', description: '', creation_date: '', protocole: '', targeted_species: '', owner_id: 1, contact_id: 1});
    setStartDate(null);
    setEndDate(null);
    setSuccess(false);
  };

  const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    let tmp_project_data = {...projectData};
    tmp_project_data[params] = e.target.value;
    setProjectData(tmp_project_data);
  }

  const handleChangeDate =(params:string,  d: Date | null ) => {
    let tmp_project_data = {...projectData};
    d !== null && (tmp_project_data[params] = d.toISOString().slice(0, 10));
    setProjectData(tmp_project_data);
  }

  const save = () => {
    const maDate = new Date()
    const data = {...projectData}
    data['creation_date'] = maDate.toISOString().slice(0, 10)
    ProjectsService.createProjectProjectsPost(data)
    updateProjects();
    updateGlobalStats();
    setSuccess(true);
  };

  return (
    <Grid container >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={5}
      >
        <Typography variant="h4" gutterBottom component="div">
          Mes projets
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddCircleIcon />} 
          style={{backgroundColor: "#BCAAA4"}}
          onClick={handleClickOpen}
        >
          Nouveau projet
        </Button>
      </Stack>
      
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
                  <Link to={`/projectsheet/${s.id}`} style={{ textDecoration: 'none', color: 'black', fontSize: '23px' }}>
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

    <Dialog open={open} onClose={handleClose}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <DialogTitle>
          <Typography variant="h6">
            Nouveau projet
          </Typography>
          </DialogTitle>
          <IconButton onClick = {handleClose} >
            <ClearTwoToneIcon/>
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <Collapse in={success}>
                <Alert severity="success" >
                  <AlertTitle>Success</AlertTitle>
                  Modifications enregistrées !  Rafraichissez la page !
                </Alert>
              </Collapse>
            </Grid>
            <Grid item lg={12}>
              <TextField 
                id="name"
                name="name"
                label="Nom"
                value ={projectData.name}
                onChange={(e) => handleFormChange("name", e)}
                fullWidth 
                variant="filled" 
              />
            </Grid>
              <Grid item lg={6}>
                <TextField
                  select 
                  label="Protocole" 
                  variant="filled"
                  value={projectData.protocole}
                  fullWidth
                  onChange={(e) => handleFormChange("protocole", e)}
                >
                  {protocoles.map((item) => (
                      <MenuItem key={item} value={item}>
                      {item}
                      </MenuItem>
                  ))}
                </TextField>
            </Grid>
            <Grid item lg={6}>
              <TextField 
                label='Espèce cible'
                id="targetedSpecies"
                select
                value={projectData.targeted_species}
                fullWidth 
                variant="filled"
                onChange={(e) => handleFormChange("targeted_species", e)}
                  
              >
                {species.map((item) => (
                    <MenuItem key={item} value={item}>
                    {item}
                    </MenuItem>
                ))}
              </TextField>
            </Grid>
                
            <Grid item lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Date de début"
                  value={startDate}
                  onChange={(startDate) => {
                      setStartDate(startDate);
                      handleChangeDate("start_date", startDate);
                  }}
                  renderInput={(params) => <TextField {...params} variant="filled" />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Date de fin"
                  value={endDate}
                  onChange={(endDate) => {
                    setEndDate(endDate);
                    handleChangeDate("end_date", endDate);
                  }}
                  renderInput={(params) => <TextField {...params} variant="filled"/>}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={12}>
              <TextField 
                id="description"
                name="description"
                label="Description"
                value ={projectData.description}
                onChange={(e) => handleFormChange("description", e)}
                fullWidth 
                variant="filled" 
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={save} style={{color: "#2FA37C"}}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default ProjectList;
