import { Box, Grid } from "@mui/material";
import AnnotationImageNavigation from "./annotationImageNavigation";


const AnnotationImageDisplay = (
    props
) => {
    return (
        <>
            {props.image ? (
                <Grid container className="pageContainer">
                    <Box sx={{ height: 300 }} className="boxImage">
                        <img
                            src={`${props.image.url}`}
                            alt={props.image.name}
                            loading="lazy"
                            style={{
                                borderBottomLeftRadius: 4,
                                borderBottomRightRadius: 4,
                                display: "block",
                                height: "fit-content",
                                maxWidth: "100%"
                            }}
                        />
                    </Box>
                    <div className="groupNumber">
                        <AnnotationImageNavigation
                            previous={props.previous}
                            next={props.next}
                            lastOrFirstImage={props.lastOrFirstImage}
                        />
                    </div>
                </Grid>
            ) : (
                <p>Image inconnue</p>
            )}
        </>
    );
};

export default AnnotationImageDisplay;