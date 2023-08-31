import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function ButtonModify({content, edit, startIcon="", variant=false, disabled=false}) {
    return (
        <Button 
            startIcon={ startIcon==="add" && <AddIcon/> } 
            color="secondary"
            variant={ variant ? "outlined" : "contained" }
            size="small"
            disabled={ disabled }
            onClick={ edit }
        >
            { content }
        </Button>
    )
}