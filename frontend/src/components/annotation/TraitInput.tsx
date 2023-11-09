import { capitalize, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const traitList = {
    sex: ["", "Mâle", "Femelle", "Indéterminé"],
    behaviour: ["", "Comportement A", "Comportement B", "Comportement C"],
    life_stage: ["", "Oeuf", "Juvénile", "Adulte"],
    biological_state: ["", "Vivant", "Mort"],
};


const TraitInput = (
    props
) => {
    const { t } = useTranslation();
    const [trait, setTrait] = useState();

    return(
        <Grid item lg={6} xs={12}>
            <TextField
                type={ props.type }
                select
                label={ capitalize(t(`taxon.${props.type}`)) } 
                size="small"
                variant="filled"
                fullWidth
            >
                {traitList[props.type].map((item) => (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    )
};
export default TraitInput;