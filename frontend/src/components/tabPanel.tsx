import { Box, Typography } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    valueTab: number;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, valueTab, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={valueTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {valueTab === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
  }

export default TabPanel;