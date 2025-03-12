import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Stack, Typography } from "@mui/material";
import { getFinestTaxonomicLevel } from "../utils/annotation_utils";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import ButtonValidate from "../common/buttonValidate";
import { useAnnotationContext } from "../../contexts/annotationContext";

const AnnotationGroupModale = () => {

    const { openAnnotationGroupModale, setOpenAnnotationGroupModale, saveandnext, setConfirmedSave, modifiedObservationGroup } = useAnnotationContext();

    let selectedGroupedObservation: string[] = [];
    let unselectedGroupedObservation: string[] = modifiedObservationGroup.map(observation => observation.id);

    const handleCheckChange = (e, id: string) => {
        if (e.target.checked) {
            selectedGroupedObservation.push(id);
            unselectedGroupedObservation.forEach((obsId, index) => {
                if (obsId === id) {
                    unselectedGroupedObservation.splice(index, 1)
                }
            });
        };
        if (!e.target.checked) {
            unselectedGroupedObservation.push(id);
            selectedGroupedObservation.forEach((obsId, index) => {
                if (obsId === id) {
                    selectedGroupedObservation.splice(index, 1)
                }
            });
        };
    };

    const handleCloseAnnotationGroupModale = () => {
        setOpenAnnotationGroupModale(false);
    };

    const validate = () => {
        handleCloseAnnotationGroupModale();
        setConfirmedSave(true);
        modifiedObservationGroup([]);
        saveandnext();
    };


    return(
        <Dialog 
            open={ openAnnotationGroupModale } 
            onClose={ handleCloseAnnotationGroupModale }
            >
            <Stack alignItems="flex-end">
                <IconButton onClick={ handleCloseAnnotationGroupModale } >
                    <ClearTwoToneIcon />
                </IconButton>
            </Stack>

            <DialogTitle>
                    <Typography variant="h6">
                        Modification d'observations initialement créées à partir de groupes d'annotation
                    </Typography>
            </DialogTitle>
                
            <Divider />

            <DialogContent>
                <Stack
                    direction="column"
                >
                    Sélectionner les observations qui doivent se répercuter à tous les médias du groupe d'annotation :
                    {modifiedObservationGroup.map((item) => 
                        <FormControlLabel
                            id={ `checkbox-${item.id}-control` }
                            control={
                                <Checkbox
                                    id={ `checkbox-${item.id}` }
                                    onChange={ (e) => handleCheckChange(e, item.id) }
                                />
                            }
                            label={ `${ getFinestTaxonomicLevel(item) } (${ item.number })`}
                        />
                    )}
                    Attention : Si une observation n'est pas sélectionnée, elle ne sera plus liée à celle des autres médias.
                </Stack>
            </DialogContent>

            <DialogActions>
                <ButtonValidate  content="OK" validate={ validate }/>
            </DialogActions>
        </Dialog>        
    )
};
export default AnnotationGroupModale;
