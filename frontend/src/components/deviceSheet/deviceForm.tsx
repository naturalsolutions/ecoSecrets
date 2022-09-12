import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid, Stack, TextField, Typography, Button, MenuItem, Dialog, DialogTitle, Divider, DialogContent, DialogActions, Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useMainContext } from '../../contexts/mainContext';
import { Devices, DevicesService} from '../../client';
import Dropzone from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const DeviceForm = () => {
    const {device} = useMainContext();
    const [deviceData, setDeviceData] = React.useState<Devices>(device());
    const models = ['Modèle A', 'Modèle B', 'Modèle C'];
    const p_date = new Date(deviceData.purchase_date);
    const [purchaseDate, setPurchaseDate] = React.useState<Date | null>(p_date);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [modified, setModified] = React.useState(false);
    const [displayValue, setDisplayValue] = React.useState('none');


    const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        let tmp_device_data = {...deviceData};
        tmp_device_data[params] = e.target.value;
        setDeviceData(tmp_device_data);
      };

    const handleChangeDate =(params:string,  d: Date | null) => {
        let tmp_device_data = {...deviceData};
        d !== null && (tmp_device_data[params] = d.toISOString().slice(0, 10));
        setDeviceData(tmp_device_data);
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
        DevicesService.updateDeviceDevicesDeviceIdPut(deviceData.id, deviceData);
        setSuccess(true);
    };
    console.log(deviceData)

    return(
        <Stack 
                spacing={2}
                justifyContent="center"
            >
            <Grid item lg={6}>
                <Dropzone 
                    // onDrop={loadFile} 
                    maxFiles={1}
                    // style={{"height": "100%"}}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section id="dropzone">
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                                <Grid container direction="column" alignItems='center'>
                                    <Grid item>
                                        <CameraAltIcon fontSize="large"/>
                                    </Grid>
                                    <Grid item>
                                        Ajouter une photo du dispositif
                                    </Grid>
                                </Grid>
                            </div>
                        </section>
                    )}
                </Dropzone>
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
                        Modifications enregistrées !  Rafraichissez la page !
                    </Alert>
                </Collapse>
                <form key={deviceData.id}>
                    <Stack
                        direction='row'
                        spacing={40}
                    >
                        <Grid container spacing={3}>
                            <Grid item lg={12}>
                                <TextField 
                                    required
                                    id="name"
                                    name="name"
                                    label="Nom"
                                    value ={deviceData.name}
                                    onChange={(e) => handleFormChange("name", e)}
                                    fullWidth 
                                    variant="filled" 
                                    sx={{ display: { xs: displayValue}}}
                                />
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                      }}
                                    select 
                                    label="Modèle" 
                                    variant="filled"
                                    value={deviceData.model}
                                    fullWidth
                                    onChange={(e) => handleFormChange("model", e)}
                                >
                                    {models.map((item) => (
                                        <MenuItem key={item} value={item}>
                                        {item}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={2.4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        readOnly= {!modified}
                                        inputFormat="dd/MM/yyyy"
                                        label="Date d'achat'"
                                        value={purchaseDate}
                                        onChange={(purchaseDate) => {
                                            setPurchaseDate(purchaseDate);
                                            handleChangeDate("purchase_date", purchaseDate);
                                        }}
                                        renderInput={(params) => <TextField {...params} variant="filled" />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                      }}
                                    label='Prix (€)'
                                    name='price'
                                    id="price"
                                    inputProps={{ type: 'number' }}
                                    value={deviceData.price}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("price", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    label='Zone de détection (m)'
                                    id="detection_area"
                                    inputProps={{ type: 'number' }}
                                    value={deviceData.detection_area}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("detection_area", e)}
                                />
                            </Grid>
                            <Grid item lg={2.4}>
                                <TextField
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    label='Autonomie (h)'
                                    id="operating_life"
                                    inputProps={{ type: 'number' }}
                                    value={deviceData.operating_life}
                                    fullWidth 
                                    variant="filled"
                                    onChange={(e) => handleFormChange("operating_life", e)}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField 
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value ={deviceData.description}
                                    onChange={(e) => handleFormChange("description", e)}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: !modified,
                                    }}
                                    fullWidth 
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
                    <Button disabled={modified} onClick={handleChange} size="small" variant="contained" style={{backgroundColor: "#2FA37C"}}>
                        Modifier
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
export default DeviceForm;