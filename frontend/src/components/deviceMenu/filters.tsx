import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Filters = () => {

    const sites = {
        'first' :{'id': 1, "name": "MonSite", "projet": "MonProjet", "img":'200'},
        'second':{'id': 2, "name": "MonSite2", "projet": "", "img":'900'},
        'third':{'id': 2, "name": "MonSite3", "projet": "MonProjet3", "img":'900'},
    }
    return (

        <Box
            component="form"
            sx={{
            width:1500,
            '& .MuiTextField-root': { m: 3},
            }}
            noValidate
            autoComplete="off"
        >
            <div className="filter">
                <TextField
                    fullWidth
                    select
                    id="projects"
                    label="Projet"
                    defaultValue="Rechercher"
                    variant="outlined" 
                    type="search"
                />
                
                <TextField
                    select
                    fullWidth
                    id="deploys"
                    label="Déploiement"
                    defaultValue="Rechercher"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="sites"
                    label="Site"
                    defaultValue="Rechercher"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="devices"
                    label="Dispositif"
                    defaultValue="Rechercher"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="status"
                    label="Statut"
                    defaultValue="Rechercher"
                    variant="outlined" 
                    type="search"
                />
                <IconButton
                >
                        <SearchIcon/>
                </IconButton>
                </div>
            </Box>
    );
};
export default Filters;