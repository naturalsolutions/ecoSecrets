import { AppBar, Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import SiteModale from "./siteModale";
import SitesTable from "./siteTable";

const SiteMenu = () => {
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
                                Mes sites
                            </Typography>
                            
                        </Grid>
                        <SiteModale/>
                    </Toolbar>
                </AppBar>
            </Box>
            <SitesTable/>
        </Stack>
    );
};
export default SiteMenu;