import { Divider, Stack, Tab, Tabs, Typography, capitalize } from "@mui/material";
import AnnotationButtons from "./AnnotationButtons";
import MetadataTab from "./MetadataTab";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import ObservationTab from "./ObservationTab";


export default function AnnotationForm(
    props
) {
    const { t } = useTranslation();

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    
    return(
        <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
            className="stackAnnotations"
        >
            <Typography 
                component="span" 
                variant="h3"
            >
                { capitalize(t("annotations.annotation")) }
            </Typography>

            <Tabs
                value={ tabValue }
                aria-label="basic tabs example"
                variant="fullWidth"
                onChange={ handleTabChange }
            >
                <Tab label={ capitalize(t("observations.observations_maybe_plural")) } />
                <Tab label={ capitalize(t("annotations.metadata")) } />
            </Tabs>

            <ObservationTab 
                observations={ props.observations } 
                treated={ props.treated } 
                annotated={ props.annotated } 
                checked={ props.checked }
                handleFormChange={ props.handleFormChange } 
                handleCheckChange={ props.handleCheckChange } 
                handleDeleteObservation={ props.handleDeleteObservation } 
                valueTab={ tabValue } 
                index={ 0 }
            />
            <MetadataTab valueTab={ tabValue } index={ 1 } /> 

            <Divider />

            <AnnotationButtons
                saveandnext={ props.saveandnext }
                handleAddObservation={ props.handleAddObservation }
            />
        </Stack >
    )
};