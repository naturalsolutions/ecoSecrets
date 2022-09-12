import { Box, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Filters = (props) => {
    console.log(props);

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
                    variant="outlined" 
                    type="search"
                />
                
                <TextField
                    select
                    fullWidth
                    id="deploys"
                    label="Déploiement"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="sites"
                    label="Site"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="devices"
                    label="Dispositif"
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="status"
                    label="Statut"
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