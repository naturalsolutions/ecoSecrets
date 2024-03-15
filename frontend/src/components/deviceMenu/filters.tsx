import { Box, IconButton, MenuItem, Stack, TextField, Typography, capitalize } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from "react-i18next";

const Filters = (props) => {
    const { t } = useTranslation();

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
                    label={capitalize(t("projects.project"))}
                    variant="outlined" 
                    type="search"
                />
                
                <TextField
                    select
                    fullWidth
                    id="deploys"
                    label={capitalize(t("deployments.deployment"))}
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="sites"
                    label={capitalize(t("sites.site"))}
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    label={capitalize(t("devices.device"))}
                    variant="outlined" 
                    type="search"
                />
                <TextField
                    select
                    fullWidth
                    id="status"
                    label={capitalize(t("devices.status"))}
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