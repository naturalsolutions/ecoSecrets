import { Box, Button, Modal, Stack, capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAnnotationContext } from "../../contexts/annotationContext";
import ButtonModify from "../common/buttonModify";
import ButtonValidate from "../common/buttonValidate";
import { useEffect, useState } from "react";
import AlertDialog from "../common/dialogSaveOrQuit";
import { useMainContext } from "../../contexts/mainContext";
import { FilesService } from "../../client";

const AnnotationButtons = () => {
    const { t } = useTranslation();
    const {image} = useMainContext()
    const { saveandnext, handleAddObservation } = useAnnotationContext();
    const [confirmationDelete, setConfirmationDelete] = useState<boolean>(false);
    const [img, setImg] = useState<any>(null)

    const toggleModalDelete = () => {

        setConfirmationDelete(!confirmationDelete)

    }

    const handleClose = () => {
        setConfirmationDelete(false)
    }

    const deleteMedia = () => {
        console.log("deleted")
        console.log(image().url)
        console.log(get_file_name(image().url))
            FilesService.deleteDeploymentMediaFile(get_file_name(image().url), image().name)
            .then(res => {
                console.log(res)
            })                

        window.location.href = "/project/1/deployment/6/details"
        setConfirmationDelete(false)
    }

    const get_file_name = (fileName) => {
        // Cette expression régulière correspond à tous les types d'extensions d'images mentionnés
        const match = fileName.match(/([^\/]+\.(image|png|jpg|jpeg|gif|bmp))/i);
        return match ? match[1] : null;
    }
    return (
        <Stack 
            direction="row" 
            justifyContent="space-between" 
            height="auto"
        >
            <Stack 
                direction="row" 
                justifyContent="flex-start" 
                spacing={2}
            >
                <ButtonModify 
                    content={ capitalize(t("observations.new")) } 
                    edit={ () => handleAddObservation() } 
                    startIcon="add" 
                />
            </Stack>
            <Stack justifyContent="flex-center">
                <Button variant="contained" color="error" onClick={toggleModalDelete}>
                    {capitalize(t("main.delete"))}
                </Button>
                <AlertDialog openDialogModal={confirmationDelete} handleClose={handleClose} title={capitalize(t("annotations.delete"))} description={capitalize(t("annotations.delete_desc"))} quit={toggleModalDelete} save={deleteMedia} >

                </AlertDialog>
                {/* <Modal open={confirmationDelete} onClose={handleClose}   aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">

                <Box>

                </Box>
  </Modal> */}
            </Stack>
            <Stack justifyContent="flex-end">
                <ButtonValidate 
                    content={ capitalize(t("main.save_and_continue")) } 
                    validate={ () => saveandnext() } 
                />
            </Stack>
            
        </Stack>
    )
};

export default AnnotationButtons;