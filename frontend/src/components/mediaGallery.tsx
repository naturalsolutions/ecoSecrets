import Masonry from "@mui/lab/Masonry";
import { useMainContext } from "../contexts/mainContext";
import { useNavigate } from "react-router-dom";
import { Box, capitalize, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';

const thumbnailStyle = {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "block",
    width: "100%"
}

export default function MediaGallery() {
    const { files } = useMainContext();
    const { t } = useTranslation();

    let navigate = useNavigate();

    const displayMedia = (id: string) => {
        navigate(`${id}`);
    };

    const displayImage = (item) => {
        if (item.extension.includes("image")) {
          return (
            <img
                src={ `${item.url}` }
                alt={ item.name }
                loading="lazy"
                onClick={ () => displayMedia(item.id) }
                style={ thumbnailStyle }
            />
          )
        }
        else {
            return(
                <video
                    style={ thumbnailStyle }
                    onClick={ () => displayMedia(item.id) }
                >
                    <source 
                        src={ `${item.url}#t=1` } // t value can be ajusted to display a specific start time as video thumbnail
                        type="video/mp4"
                    />
                    { item.name }
                </video>
            )
        }
    };

    const displayThumbnail = (item) => {
        if (item.extension.includes("image")) {
            return (
                <>
                  { displayImage(item) }
                  <Grid 
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                  >
                      <CameraAltIcon/>
                      <Typography component={"span"}>{ item.name }</Typography>
                  </Grid>
                </>
            )
        }
        else {
            return (
                <>
                    { displayImage(item) }
                    <Grid 
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <VideocamIcon/>
                        <Typography component={"span"}>{ item.name }</Typography>
                    </Grid>
                </>
            )
        };
    };

    return (
        <Box 
            sx={{ 
                width: "100%", 
                minHeight: 829, 
                paddingTop: "2vh" 
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ mb:2 }}
            >
                { capitalize(t("deployments.deploy_gallery")) }
            </Typography>
            <Masonry 
              columns={6} 
              spacing={2} 
            >
                {files?.map((item, index) => (
                    <div 
                        key={ index } 
                        style={{
                            border: "2px solid",
                            borderRadius: "5px",
                            borderColor: item.treated ? "green" : "red"
                        }}
                    >
                        { displayThumbnail(item) }
                    </div>
                ))}
            </Masonry>
        </Box>
    );
}
