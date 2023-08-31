import { Button } from "@mui/material";

export default function ButtonInteract({ content, interact }) {
    return (
        <Button 
            color="primary"
            variant="outlined"
            size="small"
            onClick={ interact }
        >
            { content }
        </Button>
    )
}