import * as React from 'react';
import { Grid, Stack, TextField, Typography, Button, MenuItem, Dialog, DialogTitle, Divider, DialogContent, DialogActions, Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from '../../contexts/mainContext';
import { DevicesService, Sites, SitesService} from '../../client';
import DropzoneComponent from '../dropzoneComponent';


const SiteForm = () => {
    const {site, updateSites} = useMainContext();
    const [siteData, setSiteData] = React.useState<Sites>(site());
    const habitats = ['Prairie', 'Forêt', 'Littoral'];
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [modified, setModified] = React.useState(false);

    const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        let tmp_site_data = {...siteData};
        tmp_site_data[params] = e.target.value;
        setSiteData(tmp_site_data);
      };

    const dialog = () => {
        setOpen(true);
    };

    const handleChange = () => {
        setModified(!modified);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = () => {
        siteData.id && SitesService.updateSiteSitesSiteIdPut(siteData?.id, siteData).then(() => {
            setModified(!modified);
            setOpen(false);
            updateSites();
            setSuccess(true);
        }).catch((err) => {
            console.log(err);
        });
    };

    return(
        <Stack 
                spacing={2}
                justifyContent="center"
            >
            <Grid item lg={6}>
                <DropzoneComponent sentence='Ajouter une photo du site'/>
            </Grid>
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
                        Modifications enregistrées !
                    </Alert>
                </Collapse>
                <form key={siteData.id}>
                    <Stack
                        direction='row'
                        spacing={40}
                    >
                        <Grid container spacing={3}>
                            { modified ?
                                <Grid item lg={12}>
                                    <TextField 
                                        required
                                        id="name"
                                        name="name"
                                        label="Nom"
                                        value ={siteData.name}
                                        onChange={(e) => handleFormChange("name", e)}
                                        fullWidth 
                                        variant="filled" 
                                    />
                                </Grid> 
                            : <></> }
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                        type: 'number'
                                      }} 
                                    label="Longitude" 
                                    variant="filled"
                                    value={siteData.longitude}
                                    fullWidth
                                    onChange={(e) => handleFormChange("longitude", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField 
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    label='Latitude'
                                    name='latitude'
                                    inputProps={{ type: 'number' }}
                                    value={siteData.latitude}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("latitude", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                      }}
                                    label='Habitat'
                                    name='habitat'
                                    select
                                    value={siteData.habitat}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("habitat", e)}
                                >
                                    {habitats.map((item) => (
                                        <MenuItem key={item} value={item}>
                                        {item}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    label='Description'
                                    id="description"
                                    value={siteData.description}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("description", e)}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
                <Stack
                    direction='row'
                    spacing={3}
                    justifyContent='flex-end'
                >
                    <Button  onClick={handleChange} size="small" variant="contained" style={{backgroundColor: "#2FA37C"}}>
                    { modified ? <>Annuler</> : <>Modifier</>}
                    </Button>
                    <Button disabled={!modified} onClick={dialog} size="small" variant="contained" style={{backgroundColor: "#BCAAA4"}}>
                        Enregistrer
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                        <Typography variant="h6">
                            Modification du piège photographique
                        </Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Typography>
                            Êtes-vous sûr de vouloir enregistrer vos mofidications ?
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
export default SiteForm;