import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Stack, Typography} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Grid, capitalize} from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import SiteForm from './siteForm';
import SiteModale from '../siteMenu/siteModale';
import { useTranslation } from 'react-i18next';


const SiteSheet = () => {
    const { t } = useTranslation()
    const {site, setCurrentSite} = useMainContext();
    
    let params = useParams();
    useEffect(() => {
        (async () => {
            setCurrentSite(Number(params.siteId));
        })();
    }, []);

    return (
        site() !== undefined ? (
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
                            {site().name}
                        </Typography>
                        
                    </Grid>
                        <SiteModale/>
                        <IconButton color="inherit" aria-label="menu" sx={{ mr: 2, display: {color: "#2FA37C"} }}>
                            <CloudDownloadIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
                <Typography variant="h4" color="#000000" component="div">
                    {capitalize(t("sites.sheet"))}
                </Typography>
            < SiteForm/>
            <div></div>
        </Stack> ) : <div>{capitalize(t("sites.no_sheet"))}</div>
    );
};
export default SiteSheet;