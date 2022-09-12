import { emphasize, styled } from "@mui/material/styles";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Chip from "@mui/material/Chip";
import { useMainContext } from "../contexts/mainContext";
import { FC } from "react";
import { useLocation } from "react-router-dom";


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
  const { project, deployment, currentImage, device } = useMainContext();
  const location = useLocation();
  console.log(location.pathname);

  const accueil = () => {
    return (<StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />)
  }

  const breadcrumbs = () => {
    if (currentImage && project() && deployment()) {
      return [
        accueil(),
        <StyledBreadcrumb
          component={Link}
          href={`/projectsheet/${project().id}`}
          underline="hover"
          key="project"
          label={project().name}
        />,
        <StyledBreadcrumb
          component={Link}
          href={`/project/${project().id}/deployment/${deploymentData.id}`}
          underline="hover"
          key="deployment"
          label={deploymentData.name}
        />,
        <StyledActiveBreadcrumb key="image" label={currentImage} />,
      ];
    } else if (deploymentData) {
      return [
        accueil(),
        <StyledBreadcrumb
          component={Link}
          href={`/projectsheet/${project().id}`}
          underline="hover"
          key="project"
          label={project().name}
        />,
        <StyledActiveBreadcrumb key="deployment" label={deploymentData.name} />,
      ];
    } else if (project()) {
      return [
        accueil(),
        <StyledActiveBreadcrumb key="project" label={project().name} />,
      ];
    } 
    else if (device()) {
      return [
        accueil(),
        <StyledBreadcrumb
          component={Link}
          href={`/devices/`}
          underline="hover"
          key="devices"
          label='Dispositifs'
        />,
        <StyledActiveBreadcrumb key="devices" label={device().name} />,
      ];
    } 
    else if (location.pathname == '/devices/') {
      return [
        accueil(),
        <StyledActiveBreadcrumb key="devices" label='Dispositifs' />,
      ];
    }
    else {
      return [
        <StyledActiveBreadcrumb
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
