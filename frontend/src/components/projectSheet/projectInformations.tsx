import { Stack, Typography, Button } from "@mui/material";
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
                    <Typography gutterBottom variant="h3" component="div" sx={{display: {color: "#BCAAA4"}}}>
                        <PhotoLibraryIcon sx={{display: {color: "#BCAAA4"}}} style={{verticalAlign:"middle", minWidth: '40px'}}/>
                        {projectSheetData.stats.media_number}
                    </Typography>
                    <Button variant="outlined" style={{color: "#2FA37C", borderColor:"#2FA37C"}}>
                        Voir les médias
                    </Button>
                </Stack>
                
                <Stack
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography gutterBottom variant="h3" component="div" sx={{display: {color: "#BCAAA4"}}}>
                        <RotateRightIcon sx={{display: {color: "#BCAAA4"}}} style={{verticalAlign:"middle", minWidth: '40px'}}/>
                        {projectSheetData.stats.annotation_percentage}
                    </Typography>
                    <Button variant="outlined" style={{color: "#2FA37C", borderColor:"#2FA37C" }}>
                        Continuer l'annotation
                    </Button>
                </Stack>

            </Stack>
        )
};
export default ProjectInformations;