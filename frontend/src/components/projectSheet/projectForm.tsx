import * as React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid, Stack, TextField, Typography, Button, MenuItem, Dialog, DialogTitle, Divider, DialogContent, DialogActions, Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from '../../contexts/mainContext';
import { ProjectSheet, ProjectsService } from '../../client';
import Dropzone from "react-dropzone";



const ProjectForm = () => {
    const {projectSheetData} = useMainContext();
    
    const [projectData, setProjectData] = React.useState<ProjectSheet>(projectSheetData);

    const protocoles = ["Protocole A", "Protocole B", "Protocole C"];
    const species = ["Loup", "Coccinelle", "Ours", "Chamois", "Chevreuil", "Cerf", "Marmotte", "Renard", "Aigle"];

    const[startDate, setStartDate] = React.useState<Date | null>(projectSheetData.start_date);
    const[endDate, setEndDate] = React.useState<Date | null>(projectSheetData.end_date);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [modified, setModified] = React.useState(false);
    const [displayValue, setDisplayValue] = React.useState('none');



    const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        let tmp_project_data = {...projectData};
        tmp_project_data[params] = e.target.value;
        setProjectData(tmp_project_data);
      };

    const handleChangeDate =(params:string,  d: Date | null) => {
        let tmp_project_data = {...projectData};
        d !== null && (tmp_project_data[params] = d.toISOString().slice(0, 10));
        setProjectData(tmp_project_data);
    };

    const dialog = () => {
        setOpen(true);
    };

    const handleChange = () => {
        setModified(!modified);
        setDisplayValue('block');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = () => {
        setModified(!modified);
        setDisplayValue('none');
        setOpen(false);
        console.log(projectData);
        ProjectsService.updateProjectProjectsProjectIdPut(projectSheetData.id, projectData);
        console.log('save');
        setSuccess(true);
    };

    

    return(
            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Collapse in={success}>
                    <Alert 
                        severity="success"  
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccess(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>   
                    }
                    >
                    <AlertTitle>Success</AlertTitle>
                        Modifications enregistrées !  Rafraichissez la page !
                    </Alert>
                </Collapse>

                <form key={projectSheetData.id}>
                    <Stack
                        direction='row'
                        spacing={15}
                    >
                        <Grid container lg={6} spacing={3}>
                        <Grid item lg={12}>
                            <TextField 
                            id="name"
                            name="name"
                            label="Nom"
                            value ={projectData.name}
                            onChange={(e) => handleFormChange("name", e)}
                            fullWidth 
                            variant="filled" 
                            sx={{ display: { xs: displayValue}}}
                            />
                        </Grid>
                        
                            <Grid item lg={6}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                      }}
                                    select 
                                    label="Protocole" 
                                    variant="filled"
                                    value={projectData['protocole']}
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
                                    InputProps={{
                                        readOnly: !modified,
                                        
                                      }}
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
                                        readOnly= {!modified}
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
                                            readOnly= {!modified}
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
                                    variant="filled"
                                    value ={projectData.description}
                                    onChange={(e) => handleFormChange("description", e)}
                                    
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    fullWidth 
                                />
                            </Grid>
                            
                        </Grid>
                        <Grid container justifyContent='center' alignItems='center' lg={6} spacing={1} style={{backgroundColor: "#D9D9D9"}}>
                            {/* Image du projet ou dropzone */}
                            <Grid item>
                            {/* <Dropzone>
                                {({ getRootProps, getInputProps }) => (
                                <section id="dropzone">
                                    <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {dropZoneDisplayText()}
                                    </div>
                                </section>
                                )}
                            </Dropzone> */}
                            </Grid>
                            
                        </Grid>
                    </Stack>
                </form>
                <Stack
                    direction='row'
                    spacing={3}
                    justifyContent='flex-end'
                >
                    <Button disabled={modified} onClick={handleChange} size="small" variant="contained" style={{backgroundColor: "#2FA37C"}}>
                        Modifier
                    </Button>
                    <Button disabled={!modified} onClick={dialog} size="small" variant="contained" style={{backgroundColor: "#BCAAA4"}}>
                        Enregistrer
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                        <Typography variant="h6">
                            Modification du projet
                        </Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Typography>
                            Êtes-vous sûr de vouloir enregistrer vos mofification ?
                            </Typography>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                        <Button onClick={save} style={{color: "#2FA37C"}}>Oui</Button>
                        <Button onClick={handleClose} style={{color: "#BCAAA4"}}>Non</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Stack>
    )
};
export default ProjectForm;