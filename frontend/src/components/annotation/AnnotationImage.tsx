import { useTranslation } from "react-i18next";
import { capitalize, Grid } from "@mui/material";
import AnnotationImageDisplay from "./AnnotationImageDisplay";
import AnnotationImageNavigation from "./AnnotationImageNavigation";


export default function AnnotationImage (
    props
) {
    const { t } = useTranslation();

    return (
        <>
            { props.image ? (
                <Grid 
                    container 
                    direction="column"
                    className="pageContainer"
                >
                    <AnnotationImageDisplay 
                        image = { props.image }
                        isAnnotated = { props.isAnnotated }
                    />
                    <AnnotationImageNavigation
                        previous={ props.previous }
                        next={ props.next }
                        lastOrFirstImage={ props.lastOrFirstImage }
                    />
                </Grid>
            ) : (
                <p>
                    { capitalize(t("annotations.unknown_image")) }
                </p>
            )}
        </>
    );
};