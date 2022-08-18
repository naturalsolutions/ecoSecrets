import { Stack, Typography, Button } from "@mui/material";
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
            <Typography variant="h6" color="#000000" component="div">
                Group1
            </Typography>
            <Typography variant="h6" color="#000000" component="div">
                Group2
            </Typography>
        </Stack>
    );
};
export default ProjectMembers;