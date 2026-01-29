import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useMainContext } from "../../contexts/mainContext";

const NonAnnotatedFilesCheckbox = () => {
    const { updateListFile } = useMainContext(); 
    const { gridView } = useAnnotationContext(); 
    const [checked, setChecked] = useState<boolean>(false);

    const handleNonAnnotatedFilesCheckbox = () => {
        if(checked) {
            setChecked(false);
            updateListFile();
        };
        if(!checked) {
            setChecked(true);
            updateListFile(true);
        };
    };

    return(
        gridView ? (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <FormControlLabel 
                    control={<Checkbox 
                        onClick={ handleNonAnnotatedFilesCheckbox }
                        defaultChecked={ checked } 
                    />} 
                    label="Non annotated media only" 
                />
            </Grid>
        ) : null
    );
};

export default NonAnnotatedFilesCheckbox;