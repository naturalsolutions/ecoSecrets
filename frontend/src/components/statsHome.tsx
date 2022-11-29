import { Button, Grid, Typography } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";
import CollectionsIcon from '@mui/icons-material/Collections';
import NotesIcon from '@mui/icons-material/Notes';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "@mui/material";

const StatsHome = () => {
    const {globalStats, sites, updateGlobalStats, devices} = useMainContext();
    const { t } = useTranslation();

    const graphicStats = {
        "medias": {'buttonLabel':`${capitalize(t("main.number_of"))} ${t("projects.media")}`, "url":"/gallery/", "icon":<CollectionsIcon fontSize="large" sx={{display: {color: "#BCAAA4"}}} />}, 
        "annotations": {'buttonLabel': `${capitalize(t("main.number"))} ${t("observations.observations")}`, "url":"", "icon":<NotesIcon fontSize="large" sx={{display: {color: "#BCAAA4"}}} />},
        "device":{'buttonLabel':`${capitalize(t("main.number_of"))} ${t("devices.devices")}`, "url":"/devices/", "icon": <CameraAltIcon fontSize="large" sx={{display: {color: "#BCAAA4"}}}/>},
        "sites": {'buttonLabel':`${capitalize(t("main.number_of"))} ${t("sites.sites")}`, "url":"/sites/", "icon": <LocationOnIcon fontSize="large" sx={{display: {color: "#BCAAA4"}}}/>}
    };

    useEffect(() => {
        updateGlobalStats()
    }, [sites, devices])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom >
                    {capitalize(t("main.stats"))}
                </Typography>
            </Grid>
            
            <Grid 
                container
                direction ='row' 
                justifyContent='center' 
                alignItems='center'
            >
                {globalStats && Object.entries(globalStats).map(([key, value]) => 
                    <Grid item lg={3} xs={6} key={key}>
                        <Grid 
                            container 
                            direction ='column' 
                            justifyContent='space-evenly' 
                            alignItems='center'
                        >
                            <Grid container direction ='row' justifyContent='center' 
                            alignItems='baseline' spacing={2}>
                                <Grid item >
                                    {graphicStats[key].icon}
                                </Grid>
                                <Grid item >
                                    <Typography color= 'secondary' variant = "h2" >
                                        {JSON.stringify(value)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item >
                                <Button 
                                    variant="outlined"
                                    component={Link}
                                    to={graphicStats[key].url}
                                >
                                    {graphicStats[key].buttonLabel}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}
export default StatsHome;