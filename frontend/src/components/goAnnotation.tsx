import { IconButton, capitalize } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { ProjectsService } from "../client";
import { useMainContext } from "../contexts/mainContext";
import { useTranslation } from "react-i18next";
import ButtonInteract from "./common/buttonInteract";
import ButtonDisplay from "./common/buttonDisplay";

const GoAnnotation = (props) => {
    const { t } = useTranslation()
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
            <ButtonInteract content={ capitalize(t("annotations.continue")) } interact={ goAnnotation } />
        )
        : (props.page === 'home' ?
            <></> 
            : 
            <ButtonDisplay content={ capitalize(t("annotations.annotation")) } />
        )
    )
}
export default GoAnnotation;