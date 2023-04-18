import * as React from 'react';
import { Grid, Stack, TextField, Typography, Button, MenuItem, Dialog, DialogTitle, Divider, DialogContent, DialogActions, Alert, AlertTitle, Box, Collapse, IconButton, capitalize } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from '../../contexts/mainContext';
import { DevicesService, Sites, SitesService} from '../../client';
import DropzoneComponent from '../dropzoneComponent';
import { useTranslation } from "react-i18next";
import Map from "../Map";
import ButtonValidate from '../common/buttonValidate';
import ButtonModify from '../common/buttonModify';
import ButtonCancel from '../common/buttonCancel';


const SiteForm = () => {
    const { t } = useTranslation();
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
                <Grid container direction="row"  alignItems="center" spacing={2}>
                    <Grid item lg={6}>
                        <DropzoneComponent sentence={`${capitalize(t("main.add_media"))} ${t("main.of")} ${t("sites.site")}`}/>
                    </Grid>
                    <Grid item lg={6} container width={500} height={300}>
                        <Map position={{ lat: siteData.latitude, lng: siteData.longitude, name: siteData.name}} zoom={3} />    
                    </Grid>
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
                    {capitalize(t('main.modifications_saved'))}
                    </Alert>
                </Collapse>
                <form key={siteData.id}>
                    <Stack
                        direction='row'
                        spacing={40}
                    >
                        <Grid container spacing={3}>
                            { modified ?
                                <Grid item lg={12} md={12} xs={12}>
                                    <TextField 
                                        required
                                        id="name"
                                        name="name"
                                        label={capitalize(t('main.name'))}
                                        value ={siteData.name}
                                        onChange={(e) => handleFormChange("name", e)}
                                        fullWidth 
                                        variant="filled" 
                                    />
                                </Grid> 
                            : <></> }
                            <Grid item lg={2.4} md={4} xs={6}>
                                <TextField
                                    disabled={!modified}
                                    label={capitalize(t('sites.longitude'))} 
                                    variant="filled"
                                    value={siteData.longitude}
                                    fullWidth
                                    onChange={(e) => handleFormChange("longitude", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4} md={4} xs={6}>
                                <TextField 
                                    disabled={!modified}
                                    label={capitalize(t('sites.latitude'))}
                                    name='latitude'
                                    inputProps={{ type: 'number' }}
                                    value={siteData.latitude}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("latitude", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4} md={4} xs={6}>
                                <TextField
                                    disabled={!modified}
                                    label={capitalize(t('sites.habitat'))}
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
                            <Grid item lg={12} md={12} xs={12}>
                                <TextField
                                    disabled={!modified}
                                    label={capitalize(t('main.description'))}
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
                    <ButtonModify
                        content={
                            modified ? 
                            <>{capitalize(t("main.cancel"))}</> : 
                            <>{capitalize(t("main.modify"))}</>
                        }
                        edit={ handleChange }
                        variant={ modified }
                    />
                    <ButtonValidate content={ capitalize(t("main.save")) } validate={ dialog } disabled={ !modified } />
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                        <Typography variant="h6">
                            {capitalize(t('sites.save_modifications_site'))}
                        </Typography>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Typography>
                                {capitalize(t('main.ask_save'))}
                            </Typography>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <ButtonCancel content={ t('main.no') } cancel={ handleClose } />
                            <ButtonValidate content={ t('main.yes') } validate={ save } />
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Stack>
    )
};
export default SiteForm;