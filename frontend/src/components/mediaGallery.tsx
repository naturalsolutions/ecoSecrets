import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import { useMainContext } from "../contexts/mainContext";
import { useNavigate } from "react-router-dom";
import { capitalize, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const thumbnailStyle = {
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  display: "block",
  width: "100%"
}

export default function MediaGallery() {
  const { files } = useMainContext();

  let navigate = useNavigate();
  const { t } = useTranslation();

  const displayMedia = (id: string) => {
    navigate(`${id}`);
  };

  const displayThumbnail = (item) => {
    if (item.extension.includes("image")) {
        return (
          <img
            src={`${item.url}`}
            alt={item.name}
            loading="lazy"
            onClick={() => displayMedia(item.id)}
            style={thumbnailStyle}
          />
        )
    }
    else {
      return (
          <video
            style={thumbnailStyle}
            onClick={() => displayMedia(item.id)}
          >
              <source 
                  src={`${item.url}#t=1`} // t value can be ajusted to display a specific start time as video thumbnail
                  type="video/mp4"
              />
              {item.name}
          </video>
      )
    };
};

  return (
    <Box sx={{ width: "100%", minHeight: 829, paddingTop: "2vh" }}>
      <Typography variant="h6" sx={{ mb:2}}>{capitalize(t("deployments.deploy_gallery"))}</Typography>
      <Masonry columns={6} spacing={2} >
        {files?.map((item, index) => (
          <div key={index} style={{
            border: "2px solid",
            borderRadius: "5px",
            borderColor: item.treated ? "green" : "red"
          }}>
            {displayThumbnail(item)}
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
