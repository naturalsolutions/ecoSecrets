import { useState, useEffect } from "react";
import { Box, Grid, capitalize } from "@mui/material";
import AnnotationImageNavigation from "./annotationImageNavigation";
import { useTranslation } from "react-i18next";

const AnnotationImageDisplay = (
    props
) => {
    const { t } = useTranslation()
    const [isAnnotedColor, setIsAnnoted] = useState<string>("")

    const mediaDisplayStyle = {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        maxWidth: "99.5%",
        maxHeight: "740px",
        border: "3px solid",
        borderRadius: "5px",
        borderColor: isAnnotedColor,
    };
    
    const displayMedia = (image) => {
        if (image.extension.includes("image")) {
            return (
                <img
                    src={ image.url }
                    alt={ image.name }
                    loading="lazy"
                    style={ mediaDisplayStyle }
                />
            )
        }
        else {
            return (
                <video
                    src={ image.url }
                    style={ mediaDisplayStyle }
                    controls
                    autoPlay={ false }
                >
                    <source 
                        type="video/mp4"
                    />
                    { image.name }
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
                <Grid 
                    container 
                    direction="column"
                    className="pageContainer"
                >
                    <Grid item
                        alignItems="center"
                        justifyContent="center"
                        className="boxImage"
                        style={{ 
                            backgroundColor: "#D9D9D9",
                        }}
                    >
                        {displayMedia(props.image)}
                    </Grid>
                    
                    <AnnotationImageNavigation
                        previous={props.previous}
                        next={props.next}
                        lastOrFirstImage={props.lastOrFirstImage}
                    />
                </Grid>
            ) : (
                <p>{capitalize(t("annotations.unknown_image"))}</p>
            )}
        </>
    );
};

export default AnnotationImageDisplay;