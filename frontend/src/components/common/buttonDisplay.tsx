import { Button } from "@mui/material";

export default function ButtonDisplay({ content }) {
    return (
        <Button 
            color="secondary"
            variant="outlined"
            size="small"
            disabled
        >
            { content }
        </Button>
    )
}