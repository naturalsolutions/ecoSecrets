import { Button, Grid, Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useMainContext } from "../../contexts/mainContext";
import { useState } from "react";
import { DeviceMenu, Devices } from "../../client";


export default function DeviceData () {
    const {device} = useMainContext();
    const [deviceData, setDeviceData] = useState<DeviceMenu>(device());
    return (
        <Stack 
            direction="row"
            justifyContent="space-evenly"
        >
        <Stack
            alignItems="center"
            justifyContent="center"
        >
            <Typography color='secondary' gutterBottom variant="h3" component="div" >
                <CheckCircleIcon fontSize='large' sx={{display: {color: "secondary"}}} style={{verticalAlign:"middle"}}/>
                
            </Typography>
            <Button variant="outlined" color='secondary'>
                {deviceData.status}
            </Button>
        </Stack>
        <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2.5}
        >
            <Grid container direction ='row' justifyContent='center' 
                alignItems='center' spacing={2}>
                <Grid item >
                    <CameraAltIcon fontSize='large' color='secondary'/>
                </Grid>
                <Grid item >
                    <Typography color= 'secondary' variant = "h3" >
                        {deviceData.nb_images}
                    </Typography>
                </Grid>
            </Grid>
            <Button variant="outlined" color='secondary'>
                Nombre de médias
            </Button>
        </Stack>
        <Stack
            alignItems="center"
            justifyContent="center"
        >
            <CalendarTodayIcon fontSize='large' color='secondary'/>
            <Typography color='secondary' gutterBottom variant="h6" component="div">
                {deviceData.last_image_date}
            </Typography>
            <Button variant="outlined" color='secondary'>
                Dernier médias
            </Button>
        </Stack>
    </Stack>
    );
}