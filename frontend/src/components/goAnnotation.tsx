import { Button, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from "react-router-dom";
import { ProjectsService } from "../client";
import { useMainContext } from "../contexts/mainContext";

const GoAnnotation = (props) => {
    const { setCurrentProject} = useMainContext()
    const navigate = useNavigate();
    const goAnnotation = () => {
        ProjectsService.getFirstUntreatedFileProjectsNextAnnotationGet(props.project_id).then((data) => {
            setCurrentProject(props.project_id)
            navigate(`/project/${props.project_id}/deployment/${data.deploy_id}/medias/${data.file_id}`)
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        props.nb_media != 0 && props.annotation_percentage < 100 ? (
            props.page == 'home' ?
            <IconButton edge="end" aria-label="add" onClick={goAnnotation}>
                <ArrowForwardIcon/>
            </IconButton> :
            <Button 
                variant="outlined"  
                onClick={goAnnotation}>
                Continuer l'annotation
            </Button>
        )
            
        : <></>
    )
}
export default GoAnnotation;