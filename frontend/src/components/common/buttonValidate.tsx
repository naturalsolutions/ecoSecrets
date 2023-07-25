import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ButtonValidate({content, validate, disabled=false, startIcon=""}) {
    return (
        <Button 
            startIcon={ startIcon==="add" && <AddCircleIcon/> } 
            color="primary"
            variant="contained"
            size="small"
            disabled={ disabled }
            onClick={ validate }
        >
            { content }
        </Button>
    )
}