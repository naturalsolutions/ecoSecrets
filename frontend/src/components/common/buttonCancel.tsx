import { Button } from "@mui/material";

export default function ButtonCancel({content, cancel}) {
    return (
        <Button 
            variant="outlined"
            color="secondary"
            size="small"
            onClick={ cancel }
        >
            { content }
        </Button>
    )
}