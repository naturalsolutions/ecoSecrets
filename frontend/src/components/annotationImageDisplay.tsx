import { useState, useEffect } from "react";
import { Box, Grid, capitalize } from "@mui/material";
import AnnotationImageNavigation from "./annotationImageNavigation";
import { useTranslation } from "react-i18next";

const mediaDisplayStyle = {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "block",
    height: "fit-content",
    maxWidth: "100%",
};

const AnnotationImageDisplay = (
    props
) => {
    const { t } = useTranslation()
    const [isAnnotedColor, setIsAnnoted] = useState<string>("")

    const displayMedia = (image) => {
        if (image.extension.includes("image")) {
            return (
                <img
                    src={image.url}
                    alt={image.name}
                    loading="lazy"
                    style={mediaDisplayStyle}
                />
            )
        }
        else {
            return (
                <video
                    src={image.url}
                    style={mediaDisplayStyle}
                    controls
                    autoPlay
                >
                    <source 
                        type="video/mp4"
                    />
                    {image.name}
                </video>
            )
        }
    };

    useEffect(() => {
        (async () => {
            props.image?.treated? setIsAnnoted("green") : (props.isAnnoted ? setIsAnnoted("orange") : setIsAnnoted("red"))
        })();
    }, [props.image?.annotations, props.isAnnoted]);

    return (
        <>
            {props.image ? (
                <Grid container className="pageContainer" >
                    <Box sx={{ height: 300 }} className="boxImage" style={{
                        border: "2px solid",
                        borderRadius: "5px",
                        borderColor: isAnnotedColor,
                        marginTop: "2vh"
                    }}>
                        {displayMedia(props.image)}
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
                <p>{capitalize(t("annotations.unknown_image"))}</p>
            )}
        </>
    );
};

export default AnnotationImageDisplay;