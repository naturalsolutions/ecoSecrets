import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  CardActions,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";

const ProjectList = () => {
  const { projects } = useMainContext();

  return (
    <Grid container direction="row">
      {projects.map((p) => (
        <Card sx={{ width: 450 }} key={p.name}>
          <CardHeader
            title={
              <Link
                to={`/project/${p.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {p.name}
              </Link>
            }
            subheader={p.creation_date || "Unknown creation date"}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_960_720.jpg"
          />
          <CardContent>{p.description || "No description"}</CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Import data">
              <DownloadIcon />
            </IconButton>
            <IconButton
              aria-label="Inspect project"
              component={Link}
              to={`/project/${p.name}`}
            >
              <VisibilityIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
};
export default ProjectList;
