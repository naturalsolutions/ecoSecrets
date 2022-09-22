import { Breadcrumbs, Stack } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import BreadcrumbElement from './breadcrumbElement';

const NavigationPath: FC<{}> = () => {
  const { project, projects, deploymentData, currentImage, device, devices, site, sites } = useMainContext();
  const location = useLocation();

  const homeBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option="Accueil"
            link="/"
            icon={true}
            isActive={isActive}
        />)
  }

  const projectBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            key="project"
            current_option={project().name}
            link={`/projectsheet/${project().id}`}
            parentlink="/projectsheet"
            options={projects}
            isActive={isActive}
        />)
  }

  const deploymentBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option={deploymentData.name} 
            link={`/project/${project().id}/deployment/${deploymentData.id}/details`}
            parentlink={`/project/${project().id}/deployment`}
            options={projects.find((p) => p.id === project().id).deployments}
            linkSuffix={`details`}
            isActive={isActive}
        />)
  }

  const imageBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option={currentImage} 
            link={`/project/${project().id}/deployment/${deploymentData.id}/details/${currentImage}`}
            parentlink={`/project/${project().id}/deployment/${deploymentData.id}/details`}
            isActive={isActive}
        />)
  }

  const devicesBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option="Dispositifs"
            link="/devices/"
            isActive={isActive}
        />)
  }

  const deviceBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option={device().name} 
            link={`/devices/${device().id}`}
            parentlink={`/devices`}
            options={devices}
            isActive={isActive}
        />)
  }
  const sitesBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option="Sites"
            link="/sites/"
            isActive={isActive}
        />)
  }
  const siteBreadcrumb = (isActive: boolean = false) => {
    return (
        <BreadcrumbElement 
            current_option={site().name}
            link={`/sites/${site().id}`}
            parentlink={`/sites`}
            options={sites}
            isActive={isActive}
        />)
  }

  const breadcrumbs = () => {
    if (currentImage && project() && deploymentData) {
      return [
        homeBreadcrumb(),
        projectBreadcrumb(),
        deploymentBreadcrumb(),
        imageBreadcrumb(true)
      ];
    } else if (deploymentData) {
      return [
        homeBreadcrumb(),
        projectBreadcrumb(),
        deploymentBreadcrumb(true)
      ];
    } else if (project()) {
      return [
        homeBreadcrumb(),
        projectBreadcrumb(true),
      ];
    } 
    else if (device()) {
      return [
        homeBreadcrumb(),
        devicesBreadcrumb(),
        deviceBreadcrumb(true)
      ];
    } 
    else if (site()) {
      return [
        homeBreadcrumb(),
        sitesBreadcrumb(),
        siteBreadcrumb(true)
      ];
    } 
    else if (location.pathname == '/devices/') {
      return [
        homeBreadcrumb(),
        devicesBreadcrumb(true)
      ];
    }
    else if (location.pathname == '/sites/') {
      return [
        homeBreadcrumb(),
        sitesBreadcrumb(true)
      ];
    }
    else {
      return [
        homeBreadcrumb(true)
      ];
    }
  };

  return (
    <div style={{height: '5vh'}}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0}
        height="100%"
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs()}
        </Breadcrumbs>
      </Stack>
    </div>
  );
};
export default NavigationPath;
