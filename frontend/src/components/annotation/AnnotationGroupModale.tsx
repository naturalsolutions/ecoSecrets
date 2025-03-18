import { capitalize, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Stack, Typography } from "@mui/material";
import { getFinestTaxonomicLevel } from "../utils/annotation_utils";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import ButtonValidate from "../common/buttonValidate";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useTranslation } from "react-i18next";

const AnnotationGroupModale = () => {
    
    const { t } = useTranslation();

    const { openAnnotationGroupModale, setOpenAnnotationGroupModale, updateConfirmedSave, modifiedObservationGroup, setModifiedObservationGroup, selectedGroupedObservation, setSelectedGroupedObservation, unselectedGroupedObservation, setUnselectedGroupedObservation } = useAnnotationContext();

    const handleCheckChange = (e, id: string) => {
        let tmpSelectedGroupedObservation = selectedGroupedObservation;
        let tmpUnselectedGroupedObservation = unselectedGroupedObservation;
        
        if (e.target.checked) {
            tmpSelectedGroupedObservation.push(id);
            tmpUnselectedGroupedObservation.forEach((obsId, index) => {
                if (obsId === id) {
                    tmpUnselectedGroupedObservation.splice(index, 1)
                }
            });
        };
        if (!e.target.checked) {
            tmpUnselectedGroupedObservation.push(id);
            tmpSelectedGroupedObservation.forEach((obsId, index) => {
                if (obsId === id) {
                    tmpSelectedGroupedObservation.splice(index, 1)
                }
            });
        };
        setSelectedGroupedObservation(tmpSelectedGroupedObservation);
        setUnselectedGroupedObservation(tmpUnselectedGroupedObservation);
    };

    const handleCloseAnnotationGroupModale = () => {
        setOpenAnnotationGroupModale(false);
    };

    const validate = () => {
        updateConfirmedSave(true);
        setModifiedObservationGroup([]);
        handleCloseAnnotationGroupModale();
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

            <DialogTitle sx={{ typography: "h6" }}>
                        {capitalize(t("annotations.modal_title"))}
            </DialogTitle>
                
            <Divider />

            <DialogContent>
                <Stack
                    direction="column"
                >
                    {capitalize(t("annotations.modal_content"))}
                    {modifiedObservationGroup?.map((item, index) => 
                        <FormControlLabel
                            key={ index }
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
                    {capitalize(t("annotations.modal_note"))}
                </Stack>
            </DialogContent>

            <DialogActions>
                <ButtonValidate  content="OK" validate={ validate }/>
            </DialogActions>
        </Dialog>        
    )
};
export default AnnotationGroupModale;
