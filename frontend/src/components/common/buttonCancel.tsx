import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function ButtonCancel({content, cancel, startIcon="", variant=false, disabled=false}) {
    return (
        <Button 
            startIcon={ startIcon==="add" && <AddIcon/> } 
            color="secondary"
            variant={ variant ? "contained" : "outlined" }
            size="small"
            disabled={ disabled }
            onClick={ cancel }
        >
            { content }
        </Button>
    )
}