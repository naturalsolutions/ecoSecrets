import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import { useMainContext } from "../contexts/mainContext";
import { useNavigate } from "react-router-dom";
import { capitalize, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry() {
  const { files } = useMainContext();

  let navigate = useNavigate();
  const { t } = useTranslation();

  const displayImg = (id: string) => {
    navigate(`${id}`);
  };


  return (
    <Box sx={{ width: "100%", minHeight: 829, paddingTop: "2vh" }}>
      <Typography variant="subtitle2">{capitalize(t("deployments.deploy_gallery"))}</Typography>
      <Masonry columns={6} spacing={2} >
        {files?.map((item, index) => (
          <div key={index} style={{
            border: "2px solid",
            borderRadius: "5px",
            borderColor: item.treated ? "green" : "red"
          }}>
            <img
              src={`${item.url}`}
              alt={item.name}
              loading="lazy"
              onClick={() => displayImg(item.id)}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                width: "100%"
              }}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
