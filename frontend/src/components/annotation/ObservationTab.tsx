import { capitalize, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import ObservationForm from "./ObservationForm";
import TabPanel from "../tabPanel";
import ButtonStatus from "../common/buttonStatus";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useTranslation } from "react-i18next";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { Annotation } from "../../client";
import { FC } from "react";
import { useMainContext } from "../../contexts/mainContext";

interface ObservationTabProps {
    valueTab: number;
    index: number;
};


const ObservationTab: FC<ObservationTabProps> = ({
    valueTab,
    index
}) => {
    const { t } = useTranslation();

    const { image } = useMainContext();
    
    const { 
        observations,
        annotated,
        treated,
        checked,
        handleCheckChange,
    } = useAnnotationContext();

    console.log("image", image())
    return(
        <TabPanel 
            valueTab={ valueTab } 
            index={ index }
        >
            {
                image() && Object.keys(image().prediction_deepfaune).length !== 0 && 
                <Grid>
                    <span> Prediction : </span>
                    <Typography> Deepfaune : {image().prediction_deepfaune.prediction.toString()}  (score : {image().prediction_deepfaune.score.toString()})  </Typography>
                </Grid>
            }
            <span className="info-annotation-ctn">
            { treated ?
                <ButtonStatus 
                    icon={ <CheckCircleRoundedIcon sx={{ color: "#4CAF50" }} /> } 
                    title={ capitalize(t("annotations.media_processed_manually")) } 
                    stylClassButton="valid" 
                /> : (
                annotated ?
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
                    checked={ checked }
                    onChange={ handleCheckChange }
                />
                }
                label={ capitalize(t("annotations.empty_media")) }
            />
            </span>

            {observations?.map((observation: Annotation, index: number) => (
                <ObservationForm 
                    key={ observation.id }
                    index={ index + 1 }
                    observation={ observation } 
                />
            ))}
        </TabPanel >
    )
};
export default ObservationTab;