import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useMainContext } from "../../contexts/mainContext";
import GoAnnotation from "../goAnnotation";

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
                >
                    {/* <CircularProgress color='secondary' variant='determinate' value={projectSheetData.stats.annotation_percentage}/> */}
                    <Typography color='secondary' gutterBottom variant="h3" component="div" >
                        {projectSheetData.stats.annotation_percentage} %
                    </Typography>
                    <GoAnnotation project_id={projectSheetData.id} nb_media={projectSheetData.stats.media_number} annotation_percentage={projectSheetData.stats.annotation_percentage} page='project'/>
                </Stack>
            </Stack>
        )
};
export default ProjectInformations;