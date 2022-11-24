import { Stack, Typography, Button, Autocomplete, TextField, capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";

const ProjectMembers = () => {
    const { t } = useTranslation()
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
                {capitalize(t("projects.members"))}
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
                    label={capitalize(t("projects.administrators"))}
                    placeholder={capitalize(t("projects.add_member"))}
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
                    label={capitalize(t("projects.validators"))}
                    placeholder={capitalize(t("projects.add_member"))}
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
                    label={capitalize(t("projects.annotators"))}
                    placeholder={capitalize(t("projects.add_member"))}
                />
                
                )}
            />
        </Stack>
    );
};
export default ProjectMembers;