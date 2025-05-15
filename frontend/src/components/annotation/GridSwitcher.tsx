
import { Switch } from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GridViewIcon from '@mui/icons-material/GridView';
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useFilesContext } from "../../contexts/filesContext";

const GridSwitcher = () => {
    const { image } = useFilesContext();
    const { gridView, setGridView, setObservations, setStatus, setChecked } = useAnnotationContext(); 

    const handleAnnotationSwitcher = () => {
        const newGridView = !gridView;
        setGridView(newGridView);

        if(!newGridView) {
            let data = image().annotations?.map(item => ({ ...item }));
            setObservations([{ ...data }]);
            setChecked(data?.length === 0);
            setStatus(image().treated ? "processed" : "not processed");
        };
        if(newGridView) {
            setObservations([]);
            setChecked(true);
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