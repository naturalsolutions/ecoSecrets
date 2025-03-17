import { capitalize, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../contexts/mainContext";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useFilesContext } from "../../contexts/filesContext";
import { t } from "i18next";

const ButtonGoAnnotation = (
    props
) => {
    
    const navigate = useNavigate();
    const { currentProject, currentDeployment } = useMainContext();
    const { setCurrentImage } = useFilesContext();
    const { setGridView } = useAnnotationContext();
    
    const handleClickButton = () => {
        navigate(`/project/${ currentProject }/deployment/${ currentDeployment }/medias/${ props.id }`);
        setCurrentImage(props.id);
        setGridView(false);
    };

    return(
        <Tooltip arrow title={capitalize(t("annotations.see"))}>
            <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                aria-label={`info about ${ props.name }`}
                onClick={ handleClickButton }
            >
                <ArrowForwardIcon />
            </IconButton>
        </Tooltip>
)};

export default ButtonGoAnnotation;