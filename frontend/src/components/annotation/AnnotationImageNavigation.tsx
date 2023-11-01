import { Grid, IconButton, Typography } from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';


const AnnotationImageNavigation = (
    props
) => {

    const { files, currentImage } = useMainContext();

    const imageIndex = () => {
        return (files && files.findIndex((f) => f.id === currentImage) + 1);
    }

    return (
        <div className="groupNumber">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {/* <IconButton>
                    <PhotoIcon />
                </IconButton>

                <Switch />
                
                <IconButton>
                    <GridViewIcon fontSize="large" />
                </IconButton> */}

                <IconButton onClick={() => props.lastOrFirstImage("first")}>
                    <FastRewindIcon fontSize="large" />
                </IconButton>

                <IconButton onClick={() => props.previous()} >
                    <SkipPreviousIcon fontSize="large" />
                </IconButton>

                <IconButton>
                    <Typography 
                        component={"span"} 
                        variant="h6" 
                        style={{ backgroundColor: "#f5f5f5" }}
                    >
                        { imageIndex() + " | " + files.length }
                    </Typography>
                </IconButton>

                <IconButton onClick={() => props.next()}>
                    < SkipNextIcon fontSize="large" />
                </IconButton>

                <IconButton onClick={() => props.lastOrFirstImage("last")}>
                    <FastForwardIcon fontSize="large" />
                </IconButton>

                {/* <IconButton >
                    <FullscreenIcon fontSize="large" />
                </IconButton> */}
            </Grid>
        </div>
    );
};

export default AnnotationImageNavigation;