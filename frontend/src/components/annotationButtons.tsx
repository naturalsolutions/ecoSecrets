import { Button, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AnnotationButtons = (props) => {
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
                    Nouvelle observation
                </Button>
            </Stack>
            
            <Stack justifyContent="flex-end">
                <Button variant="contained" onClick={() => props.saveandnext()} >
                    Enregistrer et continuer
                </Button>
            </Stack>
        </Stack>
    )
};

export default AnnotationButtons;