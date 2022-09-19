import { Stack, Typography, Button, Autocomplete, TextField } from "@mui/material";

const ProjectMembers = () => {
    const users = [
        {'id': 1, "name": "Jean Michel"},
        {'id': 2, "name": "Aurélie Jambon"},
        {'id': 3, "name": "Adrien Pajot"},
        {'id': 4, "name": "Ophélie Da Silva"},
        {'id': 5, "name": "Julien Graziani"},
        {'id': 6, "name": "Naomie Fischer"},
        {'id': 6, "name": "Maxime Vergez"},
    ]

    return (
        <Stack 
            spacing={2}
            justifyContent="center"
        >
            <Typography variant="h4" color="#000000" component="div">
                Membres
            </Typography>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={users}
                getOptionLabel={(option) => option.name}
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
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Validateurs"
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