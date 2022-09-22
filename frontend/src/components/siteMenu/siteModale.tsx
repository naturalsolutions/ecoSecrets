import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SiteBase, SitesService} from "../../client";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useMainContext } from "../../contexts/mainContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom"

export default function SiteModale () {
  const {updateSites} = useMainContext();
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState<SiteBase>({ name: '', latitude: 0, longitude: 0});
  const habitats = ['Prairie', 'Forêt', 'Littoral'];
  const handleClose = () => {
    setOpen(false);
  };
  
  const onclick = () => {
    setOpen(true);
  }

  const handleFormChange = (params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>| Date | null) => {
    let tmp_site_data = {...site};
    if(e)
        tmp_site_data[params] = e instanceof Date ? e.toISOString().slice(0, 10) : e.target.value;
    setSite(tmp_site_data);
  }

  const navigate = useNavigate();
  const save = () => {
    SitesService.createSiteSitesPost(site).then((s) => {
      updateSites();
      setOpen(false);
      navigate(`/sites/${s.id}`)
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
              Nouveau site
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
                  value ={site.name}
                  onChange={(e) => handleFormChange("name", e)}
                  fullWidth 
                  variant="filled" 
                />
              </Grid>
              <Grid item lg={6}>
                <TextField 
                  label='Longitude'
                  id="longitude"
                  inputProps={{ type: 'number' }}
                  value={site.longitude}
                  fullWidth 
                  variant="filled"
                  onChange={(e) => handleFormChange("longitude", e)}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField 
                  label='Latitude'
                  name='latitude'
                  id="latitude"
                  inputProps={{ type: 'number' }}
                  value={site.latitude}
                  fullWidth 
                  variant="filled"
                  onChange={(e) => handleFormChange("latitude", e)}
                />
              </Grid>
              <Grid item lg={6}>
                  <TextField
                    select 
                    label="Habitat" 
                    variant="filled"
                    value={site.habitat}
                    fullWidth
                    onChange={(e) => handleFormChange("habitat", e)}
                  >
                    {habitats.map((item) => (
                        <MenuItem key={item} value={item}>
                        {item}
                        </MenuItem>
                    ))}
                  </TextField>
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
