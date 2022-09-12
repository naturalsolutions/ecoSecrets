import { Grid, IconButton, Switch, Typography } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import GridViewIcon from '@mui/icons-material/GridView';
import PhotoIcon from '@mui/icons-material/Photo';


const AnnotationImageNavigation = (
    props
) => {

    const { files, currentImage } = useMainContext();

    const imageIndex = () => {
        return (files && files.findIndex((f) => f.id === currentImage)+1);
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={5}
        > 
            <Grid item>
                <IconButton>
                    <PhotoIcon/>
                </IconButton>
                <Switch />
                <IconButton>
                    <GridViewIcon fontSize='large'/>
                </IconButton>
            </Grid>
            
            <Grid item>
                <IconButton>
                    <FastRewindIcon fontSize='large'/>
                </IconButton>
                <IconButton  onClick={() => props.previous()} >
                    <SkipPreviousIcon fontSize='large'/>
                </IconButton>
                <IconButton>
                    <Typography variant="h6" style={{backgroundColor: "#f5f5f5"}}>{imageIndex() + ' | ' + files.length}</Typography>
                </IconButton>
                <IconButton  onClick={() => props.next()}>
                    < SkipNextIcon fontSize='large'/>
                </IconButton>
                <IconButton >
                    <FastForwardIcon fontSize='large'/>
                </IconButton>
             </Grid >

            <Grid item>
                <IconButton >
                    <FullscreenIcon fontSize='large'/>
                </IconButton>
            </Grid>
            
        </Grid>
    );
};

export default AnnotationImageNavigation;