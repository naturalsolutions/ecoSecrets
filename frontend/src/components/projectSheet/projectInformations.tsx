import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { useMainContext } from "../../contexts/mainContext";

const ProjectInformations = () => {
    const {projectSheetData} = useMainContext();
    return (
            <Stack 
                direction="row"
                justifyContent="space-evenly"
            >
                <Stack
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography color='secondary' gutterBottom variant="h3" component="div" >
                        <PhotoLibraryIcon sx={{display: {color: "#BCAAA4"}}} style={{verticalAlign:"middle", minWidth: '40px'}}/>
                        {projectSheetData.stats.media_number}
                    </Typography>
                    <Button variant="outlined" >
                        Voir les médias
                    </Button>
                </Stack>
                
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={3}
                >
                   
                        <CircularProgress color='secondary' variant="determinate" value={projectSheetData.stats.annotation_percentage} />
                      
                    <Button variant="outlined" >
                        Continuer l'annotation
                    </Button>
                </Stack>

            </Stack>
        )
};
export default ProjectInformations;