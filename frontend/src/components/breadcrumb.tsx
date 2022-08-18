import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Chip from "@mui/material/Chip";
import { useMainContext } from "../contexts/mainContext";
import { FC } from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const StyledActiveBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: "#ffffff",
    color: '#2fa37c',
    height: theme.spacing(3),
    variant: "outlined",
  };
}) as typeof Chip;

const NavigationPath: FC<{}> = () => {
  const { project, deployment, currentImage } = useMainContext();

  const breadcrumbs = () => {
    if (currentImage && project() && deployment()) {
      return [
        <StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />,
        <StyledBreadcrumb
          component={Link}
          href={`/project/${project().id}`}
          underline="hover"
          key="project"
          label={project().name}
        />,
        <StyledBreadcrumb
          component={Link}
          href={`/deployment/${deployment().id}`}
          underline="hover"
          key="deployment"
          label={deployment().name}
        />,
        <StyledActiveBreadcrumb key="image" label={currentImage} />,
      ];
    } else if (deployment()) {
      return [
        <StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />,
        <StyledBreadcrumb
          component={Link}
          href={`/project/${project().id}`}
          underline="hover"
          key="project"
          label={project().name}
        />,
        <StyledActiveBreadcrumb key="deployment" label={deployment().name} />,
      ];
    } else if (project()) {
      return [
        <StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />,
        <StyledActiveBreadcrumb key="project" label={project().name} />,
      ];
    } else {
      return [
        <StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />,
      ];
    }
  };

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {breadcrumbs()}
    </Breadcrumbs>
  );
};
export default NavigationPath;
