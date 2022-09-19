import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import { useMainContext } from "../contexts/mainContext";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

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

  const displayImg = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <Box sx={{ width: "100%", minHeight: 829 }}>
      <Typography variant="subtitle2">Galerie du déploiement</Typography>
      <Masonry columns={6} spacing={2}>
        {files?.map((item, index) => (
          <div key={index}>
            {/* <Label>{item.name}</Label> */}
            <img
              src={`${item.url}`}
              alt={item.name}
              loading="lazy"
              onClick={() => displayImg(item.id)}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
