import { Stack, Typography, Button, Autocomplete, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ProjectMembers = () => {
    const users = [
        {'id': 1, "name": "Jean Michel"},
        {'id': 2, "name": "Aurélie Jambon"},
        {'id': 3, "name": "Adrien Pajot"},
        {'id': 4, "name": "Ophélie Da Silva"},
        {'id': 5, "name": "Julien Graziani"},
        {'id': 6, "name": "Naomie Fischer"},
    ]

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
            <Autocomplete
                multiple
                id="tags-outlined"
                options={users}
                getOptionLabel={(option) => option.name}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Administrateurs"
                    placeholder="Ajouter un membre"
                />
                
                )}
            />
            <Autocomplete
                multiple
                id="tags-outlined"
                options={users}
                getOptionLabel={(option) => option.name}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Annotateurs"
                    placeholder="Ajouter un membre"
                />
                
                )}
            />
        </Stack>
    );
};
export default ProjectMembers;