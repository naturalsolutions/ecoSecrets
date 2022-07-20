import { emphasize, styled } from '@mui/material/styles';
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import { useMainContext } from '../contexts/mainContext';
import { FC } from 'react';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
    backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const StyledActiveBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: "#ffffff",
    height: theme.spacing(3),
    variant: "outlined"
  };
}) as typeof Chip;

// let breadcrumbs = [
  // <StyledBreadcrumb
  //     component={Link}
  //     href="/"
  //     key="accueil"
  //     underline="hover"
  //     label="Accueil"
  //     icon={<HomeIcon fontSize="small" />}
  // />,
  // <StyledBreadcrumb
  //     component={Link}
  //     href="/project/projectid"
  //     underline="hover"
  //     key="project"
  //     label="Project name"
  // />,
  // <StyledBreadcrumb
  //     component={Link}
  //     href="/deployment/deploymentid"
  //     underline="hover"
  //     key="deployment"
  //     label="Deployment name"
  // />,
  // <StyledActiveBreadcrumb  
  //   label="Photo name"
  //   key="photo"
  // />
// ];

const NavigationPath: FC<{}> = () => {
  const { project, deployment } = useMainContext();

  const breadcrumbs = () => {
    if (deployment) {
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
          href="/project/projectid"
          underline="hover"
          key="project"
          label={project}
        />,
        <StyledActiveBreadcrumb
          key="deployment"
          label={deployment}
        />
      ]
    }
    else if (project) {
      return [
        <StyledBreadcrumb
          component={Link}
          href="/"
          key="accueil"
          underline="hover"
          label="Accueil"
          icon={<HomeIcon fontSize="small" />}
        />,
        <StyledActiveBreadcrumb
          key="project"
          label={project}
        />
      ]
    }
    else {
      return [
        <StyledActiveBreadcrumb
          key="accueil"
          label="Accueil"
        />
      ]
    }
  }

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      { breadcrumbs() }
    </Breadcrumbs>
  )
};
export default NavigationPath;