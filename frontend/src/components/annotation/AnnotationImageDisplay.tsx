import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import { useAnnotationContext } from "../../contexts/annotationContext";

const AnnotationImageDisplay = () => {
  const [isAnnotatedColor, setIsAnnotatedColor] = useState<string>("");
  const { image } = useMainContext();
  const { annotated } = useAnnotationContext();

  const mediaDisplayStyle = {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    maxWidth: "99.5%",
    maxHeight: "600px",
    border: "3px solid",
    borderRadius: "5px",
    borderColor: isAnnotatedColor,
  };

  const displayMedia = (image) => {
    if (image.extension.includes("image")) {
      return (
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          style={mediaDisplayStyle}
        />
      );
    } else {
      return (
        <video
          src={image.url}
          style={mediaDisplayStyle}
          controls
          autoPlay={false}
        >
          <source type="video/mp4" />
          {image.name}
        </video>
      );
    }
  };

  useEffect(() => {
    (async () => {
      image()?.treated
        ? setIsAnnotatedColor("green")
        : annotated
        ? setIsAnnotatedColor("orange")
        : setIsAnnotatedColor("red");
    })();
  }, [image()?.annotations, annotated]);

  return (
    <>
      <Grid
        item
        alignItems="center"
        justifyContent="center"
        className="boxImage"
        style={{
          backgroundColor: "#D9D9D9",
        }}
      >
        {displayMedia(image())}
      </Grid>
    </>
  );
};

export default AnnotationImageDisplay;
