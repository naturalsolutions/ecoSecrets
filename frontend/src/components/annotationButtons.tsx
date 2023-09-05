import { Stack, capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonModify from "./common/buttonModify";
import ButtonValidate from "./common/buttonValidate";

const AnnotationButtons = (props) => {
    const { t } = useTranslation()
    return (
        <Stack 
            direction="row" 
            justifyContent="space-between" 
            height={"auto"}
        >
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
                <ButtonModify content={ capitalize(t("observations.new")) } edit={ () => props.handleAddObservation() } startIcon="add" />
            </Stack>
            
            <Stack justifyContent="flex-end">
                <ButtonValidate content={ capitalize(t("main.save_and_continue")) } validate={ () => props.saveandnext() } />
            </Stack>
        </Stack>
    )
};

export default AnnotationButtons;