
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import DeploymentForm from "./deploymentForm";
import ImageList from "./imageList";
import TabPanel from "./tabPanel";

const DeploymentDetails = () => {

    const [tabValue, setTabValue] = useState(0);
    const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };

    return(
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={tabValue} 
                    onChange={handleTabValueChange} 
                    aria-label="deployment tab"
                    variant='fullWidth'
                >
                <Tab label="Details" />
                <Tab label="Annotations" />
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