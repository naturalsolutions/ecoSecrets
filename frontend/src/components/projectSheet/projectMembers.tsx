import { Stack, Typography, Button, Autocomplete } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ProjectMembers = () => {
    return (
        <Stack 
            spacing={2}
            justifyContent="center"
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                spacing={5}
            >
                <Typography variant="h4" color="#000000" component="div">
                    Membres
                </Typography>
                <Button variant="contained" startIcon={<AddCircleIcon />} style={{backgroundColor: "#BCAAA4"}}>
                    Ajouter un groupe
                </Button>
            </Stack>
            {/* <Autocomplete
                multiple
                id="tags-outlined"
                options='hihi'
                getOptionLabel={(option) => option.title}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                />
                )}
            /> */}
            {/* <Typography variant="h6" color="#000000" component="div">
                Group1
            </Typography>
            <Typography variant="h6" color="#000000" component="div">
                Group2
            </Typography> */}
        </Stack>
    );
};
export default ProjectMembers;