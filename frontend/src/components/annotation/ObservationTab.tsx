import { capitalize, FormControlLabel, Switch } from "@mui/material";
import AnnotationObservationForm from "./AnnotationObservationForm";
import TabPanel from "../tabPanel";
import ButtonStatus from "../common/buttonStatus";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useTranslation } from "react-i18next";


const ObservationTab = (
    props
) => {
    const { t } = useTranslation();
    
    return(
        <TabPanel 
            valueTab={ props.valueTab } 
            index={ props.index }
        >
            <span className="info-annotation-ctn">
            { props.treated ?
                <ButtonStatus 
                    icon={ <CheckCircleRoundedIcon sx={{ color: "#4CAF50" }} /> } 
                    title={ capitalize(t("annotations.media_processed_manually")) } 
                    stylClassButton="valid" 
                /> : (
                props.annotated ?
                <ButtonStatus 
                    icon={ <HelpRoundedIcon sx={{ color: "#FF9800" }} /> } 
                    title={ capitalize(t("observations.not_saved")) } 
                    stylClassButton="info" 
                /> :
                <ButtonStatus 
                    icon={ <HelpRoundedIcon sx={{ color: "#F44336" }} /> } 
                    title={ capitalize(t("annotations.media_not_processed")) } 
                    stylClassButton="warning" 
                />
            )}
            <FormControlLabel
                id="switch-empty-control"
                control={
                <Switch
                    id="switch-empty"
                    checked={ props.checked }
                    onChange={ props.handleCheckChange }
                />
                }
                label={ capitalize(t("annotations.empty_media")) }
            />
            </span>

            {props.observations.map((observation, index) => (
                <AnnotationObservationForm 
                    key={ observation.id } 
                    index={ index + 1 }
                    observation={ observation } 
                    handleFormChange={ props.handleFormChange } 
                    handleCheckChange={ props.handleCheckChange } 
                    handleDeleteObservation={ props.handleDeleteObservation } 
                />
            ))}
        </TabPanel >
    )
};
export default ObservationTab;