import { capitalize, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from "react-router-dom";
import { useMainContext } from "../../contexts/mainContext";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useFilesContext } from "../../contexts/filesContext";
import { t } from "i18next";

const ButtonGoAnnotation = (
    props
) => {
    const params = useParams();
    const navigate = useNavigate();
    const { setCurrentImage } = useFilesContext();
    const { setGridView } = useAnnotationContext();
    

    const handleClickButton = () => {
        navigate(`/project/${ params.projectId }/deployment/${ params.deploymentId }/medias/${ props.id }`);
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