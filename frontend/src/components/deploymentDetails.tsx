
import { AppBar, Box, Grid, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useState } from "react";
import DeploymentForm from "./deploymentForm";
import ImageList from "./imageList";
import TabPanel from "./tabPanel";
import { useMainContext } from "../contexts/mainContext";

const DeploymentDetails = (props) => {
    const { deploymentData } = useMainContext();
    const [tabValue, setTabValue] = useState(props.bool);
    const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

    return(
        <Box sx={{ width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar variant="dense">
                    <Grid
                        container
                    >
                        <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                            { deploymentData && deploymentData.name }
                        </Typography>
                        
                    </Grid>
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton aria-label="menu" sx={{ mr: 2 }}>
                            <CloudDownloadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabValueChange} 
                    aria-label="deployment tab"
                    variant='fullWidth'
                >
                <Tab label="Details" />
                <Tab label="Médias" />
                </Tabs>
            </Box>
            <TabPanel valueTab={tabValue} index={0}>
                <DeploymentForm/>
            </TabPanel>
            <TabPanel valueTab={tabValue} index={1}>
                <ImageList/>
            </TabPanel>
        </Box>
        
        // 
    )
};
export default DeploymentDetails;