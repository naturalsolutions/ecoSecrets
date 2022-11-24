import { Button, Stack, capitalize } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from "react-i18next";

const AnnotationButtons = (props) => {
    const { t } = useTranslation()
    return (
        <Stack 
            direction="row" 
            justifyContent="space-between" 
            height={"auto"}
        >
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
                <Button 
                    startIcon={<AddIcon/>} 
                    onClick={() => props.handleAddObservation()} variant="contained"color='secondary'>
                    {capitalize(t("observations.new"))}
                </Button>
            </Stack>
            
            <Stack justifyContent="flex-end">
                <Button variant="contained" onClick={() => props.saveandnext()} >
                    {capitalize(t("main.save_and_continue"))}
                </Button>
            </Stack>
        </Stack>
    )
};

export default AnnotationButtons;