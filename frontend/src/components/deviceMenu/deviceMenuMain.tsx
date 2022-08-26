import { AppBar, Box, Grid, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Filters from './filters';
import DevicesTable from "./devicesTable";

const DeviceMenu = () => {

    return (
        <Stack 
            direction="column"
            spacing={3}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar variant="dense">
                    <Grid
                        container
                    >
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                            Mes dispositifs
                        </Typography>
                        
                    </Grid>
                    
                        <IconButton aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <AddCircleIcon />
                        </IconButton>
 
                    </Toolbar>
                </AppBar>
            </Box>

            <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Filters />
                <Typography variant="h4" color="#000000" component="div">
                   Stock
                </Typography>
                <Grid container justifyContent="center" alignItems='center'>
                    <Grid item justifyContent="center" height={400} width={1000} spacing={1} style={{backgroundColor: "#D9D9D9"}}>
                        {/* Image du projet ou dropzone */}
                        <Typography variant="subtitle1">
                            Prochainement une carte avec zone d'étude et sites de déploiement
                        </Typography>
                    </Grid>
                </Grid>
                <DevicesTable/>
            </Stack>   
        </Stack>
    );
};
export default DeviceMenu;
