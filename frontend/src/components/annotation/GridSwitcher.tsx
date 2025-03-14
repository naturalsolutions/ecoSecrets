
import { Switch } from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GridViewIcon from '@mui/icons-material/GridView';
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useMainContext } from "../../contexts/mainContext";

const GridSwitcher = () => {
    const { image } = useMainContext();
    const { gridView, setGridView, setObservations } = useAnnotationContext(); 

    const handleAnnotationSwitcher = () => {
        if(gridView) {
            setGridView(0);
            setObservations(image().annotations)
        };
        if(!gridView) {
            setGridView(1);
            setObservations([]);
        };
    }; 

    return(
        <>
            <PhotoIcon color={ gridView ? "secondary" : "primary" } fontSize="small"/>
            <Switch checked={ gridView } onClick={ handleAnnotationSwitcher } />
            <GridViewIcon fontSize="small" color={ gridView ? "primary" : "secondary"  } />
        </>
    )
};

export default GridSwitcher;