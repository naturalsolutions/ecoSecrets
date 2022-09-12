import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { forwardRef, useState } from "react";
import { DeviceBase, DevicesService} from "../../client";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useMainContext } from "../../contexts/mainContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navigate, NavigateProps, useNavigate } from "react-router-dom"



export default function DeviceModal () {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<DeviceBase>({ name: '', model: '', purchase_date: '', price: 0, description: '', detection_area: 0, status: 'En stock', operating_life:0})
  const models = ['Modèle A', 'Modèle B', 'Modèle C'];
  const handleClose = () => {
    setOpen(false);
  };
  const {updateDeviceMenu, setCurrentDevice, updateDevices} = useMainContext();
    
  const onclick = () => {
    setOpen(true);
  }

  const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>| Date | null) => {
    let tmp_device_data = {...device};
    if(e)
        tmp_device_data[params] = e instanceof Date ? e.toISOString().slice(0, 10) : e.target.value;
    setDevice(tmp_device_data);
  }

  const navigate = useNavigate();

  const save = () => {
    DevicesService.createDeviceDevicesPost(device).then((d) => {
      updateDeviceMenu();
      updateDevices();
      // setCurrentDevice(d.id);
      setOpen(false);
      navigate(`/devices/${d.id}`)
      
  })
  .catch((err) => {
      console.log(err);
  });
  };

  return (
    <Grid>
      <IconButton aria-label="menu" onClick={() => onclick()} sx={{ mr: 2, display: {color: "#2FA37C"} }}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <DialogTitle>
            <Typography variant="h6">
              Nouveau dispositif
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
                <TextField 
                  required
                  id="name"
                  name="name"
                  label="Nom"
                  value ={device.name}
                  onChange={(e) => handleFormChange("name", e)}
                  fullWidth 
                  variant="filled" 
                />
              </Grid>
                <Grid item lg={6}>
                  <TextField
                    select 
                    label="Modèle" 
                    variant="filled"
                    value={device.model}
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
              <Grid item lg={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Date d'achat"
                    value={new Date(device.purchase_date)}
                    onChange={(purchaseDate) => {
                      purchaseDate && handleFormChange("purchase_date", new Date(purchaseDate));
                    }}
                    renderInput={(params) => <TextField {...params} variant="filled" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item lg={6}>
                <TextField 
                  label='Autonomie (h)'
                  id="operating_life"
                  inputProps={{ type: 'number' }}
                  value={device.operating_life}
                  fullWidth 
                  variant="filled"
                  onChange={(e) => handleFormChange("operating_life", e)}
                    
                />
              </Grid>
              <Grid item lg={6}>
                <TextField 
                  label='Prix (€)'
                  name='price'
                  id="price"
                  inputProps={{ type: 'number' }}
                  value={device.price}
                  fullWidth 
                  variant="filled"
                  onChange={(e) => handleFormChange("price", e)}
                    
                />
              </Grid>
              <Grid item lg={12}>
                <TextField 
                  label='Zone de détection (m)'
                  id="detection_area"
                  inputProps={{ type: 'number' }}
                  value={device.detection_area}
                  fullWidth 
                  variant="filled"
                  onChange={(e) => handleFormChange("detection_area", e)}
                    
                />
              </Grid>
              <Grid item lg={12}>
                <TextField 
                  id="description"
                  name="description"
                  label="Description"
                  value ={device.description}
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
}
