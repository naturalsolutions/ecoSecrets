import { capitalize, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Stack } from "@mui/material";
import { getFinestTaxonomicLevel } from "../utils/annotation_utils";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import ButtonValidate from "../common/buttonValidate";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useTranslation } from "react-i18next";
import { useFilesContext } from "../../contexts/filesContext";
import { useMainContext } from "../../contexts/mainContext";
import { FilesService } from "../../client";

const AnnotationGroupModale = () => {

    const { t } = useTranslation();

    const { currentDeployment } = useMainContext();

    const { updateListFile, currentImage, paginationFiles,imagePerPage } = useFilesContext();

    const { openAnnotationGroupModale, setOpenAnnotationGroupModale, observations, idGroup, selectedGroupedObservation, unselectedGroupedObservation, setSelectedGroupedObservation, setUnselectedGroupedObservation, modifiedObservationGroup,setModifiedObservationGroup, next } = useAnnotationContext();

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
        let annotationData = {
            annotations: observations,
            id_group: idGroup,
            group_observations_id_to_update: selectedGroupedObservation, 
            group_observations_id_to_individualize: unselectedGroupedObservation
        };

        FilesService
            .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, {
              annotations: annotationData,
              deployment_id: currentDeployment
            })
            .then(res => {
                updateListFile((paginationFiles.currentPage -1) *imagePerPage);
                next();
            })
            .catch((err) => {
                console.log("Error during annotation saving.");
                console.log(err);
            });

        setModifiedObservationGroup([]);
        handleCloseAnnotationGroupModale();
        next();
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
