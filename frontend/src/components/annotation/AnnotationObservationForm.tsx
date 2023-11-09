import { Grid, IconButton, Stack, TextField, Typography, capitalize } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { request as __request } from '../../client/core/request';
import { useTranslation } from "react-i18next";
import TaxonomicInput from "./TaxonomicInput";
import { useAnnotationContext } from "../../contexts/annotationContext";
// import NestedList from "../common/collapsableButton";
// import TraitInput from "./TraitInput";


const AnnotationObservationForm = (
    props
) => {
    const { t } = useTranslation();

    const { 
        handleDeleteObservation,
        handleFormChange
    } = useAnnotationContext();
    
    return (
        <form key={props.observation.id}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography component={"span"} variant="h6">
                    { `Observation ${ props.index }` }
                </Typography>

                <IconButton
                    onClick={() => handleDeleteObservation(props.observation.id)} >
                    <ClearTwoToneIcon />
                </IconButton>
            </Stack>
            <Grid container spacing={1}>
                <TaxonomicInput 
                    rank="classe" 
                    observation={ props.observation }
                />

                <TaxonomicInput 
                    rank="order" 
                    observation={ props.observation }
                />

                <TaxonomicInput 
                    rank="family" 
                    observation={ props.observation }
                />

                <TaxonomicInput 
                    rank="genus" 
                    observation={ props.observation }
                />

                <TaxonomicInput 
                    rank="species" 
                    observation={ props.observation }
                />
                
                <Grid item lg={6} xs={12}>
                    <TextField
                        name="number"
                        label={capitalize(t("taxon.number"))}
                        size="small"
                        variant='filled'
                        inputProps={{ type: 'number' }}
                        value={props.observation.number}
                        onChange={
                            (e) => handleFormChange(props.observation.id, "number", e.target.value)
                        }
                        fullWidth
                    />
                </Grid>
            </Grid>
            {/* <NestedList>
                <Grid container spacing={1}>
                    <TraitInput 
                        type="biological_state" 
                    />
                    <TraitInput 
                        type="sex" 
                    />
                    <TraitInput 
                        type="behaviour" 
                    />
                    <TraitInput 
                        type="life_stage" 
                    />
                </Grid>
            </NestedList> */}
        </form>
    )
};
export default AnnotationObservationForm;