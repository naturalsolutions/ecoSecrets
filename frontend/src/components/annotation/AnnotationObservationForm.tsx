import { Grid, IconButton, MenuItem, Stack, TextField, Typography, capitalize } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import NestedList from "../common/collapsableButton";
import { request as __request } from '../../client/core/request';
import { useTranslation } from "react-i18next";
import TaxonomicInput from "./TaxonomicInput";
import { useState } from "react";
import TraitInput from "./TraitInput";

// interface SpeciesOptionType {
//     REGNE: string;
//     PHYLUM: string;
//     CLASSE: string;
//     ORDRE: string;
//     FAMILLE: string;
//     SOUS_FAMILLE: string;
//     TRIBU: string;
//     GROUP1_INPN: string;
//     GROUP2_INPN: string;
//     CD_NOM: string;
//     CD_TAXSUP: string;
//     CD_SUP: string;
//     CD_REF: string;
//     RANG: string;
//     LB_NOM: string;
//     LB_AUTEUR: string;
//     NOM_COMPLET: string;
//     NOM_COMPLET_HTML: string;
//     NOM_VALIDE: string;
//     NOM_VERN: string;
//     NOM_VERN_ENG: string;
//     HABITAT: string;
//     FR: string;
//     GF: string;
//     MAR: string;
//     GUA: string;
//     SM: string;
//     SB: string;
//     SPM: string;
//     MAY: string;
//     EPA: string;
//     REU: string;
//     SA: string;
//     TA: string;
//     TAAF: string;
//     PF: string;
//     NC: string;
//     WF: string;
//     CLI: string;
//     URL: string;
// }

interface observationType {
    classe: string;
    order: string;
    family: string;
    genus: string;
    species: string;
    number: number;
    biological_stade: string;
    sex: string;
    behaviour: string;
    life_stage: string;
    comments: string;
}

const AnnotationObservationForm = (
    props
) => {
    const { t } = useTranslation();

    const [currentObservation, setCurrentObservation] = useState<observationType>({
        classe: "",
        order: "",
        family: "",
        genus: "",
        species: "",
        number: 0,
        biological_stade: "",
        sex: "",
        behaviour: "",
        life_stage: "",
        comments: ""
    });

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
                    onClick={() => props.handleDeleteObservation(props.observation.id)} >
                    <ClearTwoToneIcon />
                </IconButton>
            </Stack>
            <Grid container spacing={1}>
                <TaxonomicInput 
                    rank="classe" 
                    observation={ props.observation }
                    currentObservation={ currentObservation }
                    setCurrentObservation={ setCurrentObservation }
                    handleFormChange={ props.handleFormChange }
                />

                <TaxonomicInput 
                    rank="order" 
                    observation={ props.observation }
                    currentObservation={ currentObservation }
                    setCurrentObservation={ setCurrentObservation }
                    handleFormChange={ props.handleFormChange }
                />

                <TaxonomicInput 
                    rank="family" 
                    observation={ props.observation }
                    currentObservation={ currentObservation }
                    setCurrentObservation={ setCurrentObservation }
                    handleFormChange={ props.handleFormChange }
                />

                <TaxonomicInput 
                    rank="genus" 
                    observation={ props.observation }
                    currentObservation={ currentObservation }
                    setCurrentObservation={ setCurrentObservation }
                    handleFormChange={ props.handleFormChange }
                />

                <TaxonomicInput 
                    rank="specie" 
                    observation={ props.observation }
                    currentObservation={ currentObservation }
                    setCurrentObservation={ setCurrentObservation }
                    handleFormChange={ props.handleFormChange }
                />
                
                <Grid item lg={6} xs={12}>
                    <TextField
                        name="number"
                        label={capitalize(t("species.number"))}
                        size="small"
                        variant='filled'
                        inputProps={{ type: 'number' }}
                        value={props.observation.number}
                        onChange={
                            (e) => props.handleFormChange(props.observation.id, "number", e)
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