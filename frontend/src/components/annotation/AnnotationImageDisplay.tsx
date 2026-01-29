import { Grid } from "@mui/material";
import { useFilesContext } from "../../contexts/filesContext";

const AnnotationImageDisplay = () => {
  const { image } = useFilesContext();

  const mediaDisplayStyle = {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: "100%",
    height: "100%",
    "object-fit": "contain",
    display: "block",
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

  return (
    <>
      <Grid
        alignItems="center"
        justifyContent="center"
        className="boxImage"
        style={{
          backgroundColor: "#D9D9D9",
          overflow: "auto",
        }}
      >
        {displayMedia(image())}
      </Grid>
    </>
  );
};

export default AnnotationImageDisplay;
