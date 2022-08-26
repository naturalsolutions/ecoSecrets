
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import DeploymentForm from "./deploymentForm";
import ImageList from "./imageList";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

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
            <TabPanel value={tabValue} index={0}>
                <DeploymentForm/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <ImageList/>
            </TabPanel>
        </Box>
        
        // 
    )
};
export default DeploymentDetails;