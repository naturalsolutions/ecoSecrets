import { AppBar, Box, capitalize, Grid, Stack, Toolbar, Typography } from "@mui/material";
import SiteModale from "./siteModale";
import SitesTable from "./siteTable";
import { useTranslation } from "react-i18next";

const SiteMenu = () => {
    const { t } = useTranslation();
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
                                {capitalize(t('sites.title'))}
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