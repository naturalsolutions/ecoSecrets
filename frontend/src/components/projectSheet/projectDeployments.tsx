import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertTitle, Paper, Stack, Link, capitalize } from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import ProjectDeploymentDeleteModale from "./projectDeploymentsDeleteModale";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// const header = ['Nom', 'Date de début', 'Date de fin', 'Nom du site', 'Nom du dispositif', 'Voir la fiche déploiment', 'Supprimer le déploiement'];


const ProjectDeployments = () => {
  const { t } = useTranslation();
  const { projectSheetData, sites, devices } = useMainContext();

  const getSite = (index) => {
    let site = sites.find(element => element.id == index);
    return <Link component={RouterLink} to={`/sites/${site.id}`}>{site.name}</Link>
  }

  const getDevices = (index) => {
    let device = devices.find(element => element.id == index);
    return <Link component={RouterLink} to={`/devices/${device.id}`}>{device.name}</Link>
  }
  
  return (
    projectSheetData.deployments.length !== 0 ?
      <Stack
        spacing={2}
        justifyContent="center"
      >

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ backgroundColor: "#CCDFD9" }}>
              <TableRow>
                <StyledTableCell align="center">
                  {capitalize(t("main.name"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize(t("projects.start_date"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize(t("projects.end_date"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                {capitalize(t("projects.site_name"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize( t("projects.device_name"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize( t("projects.import_media"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize(t("deployments.delete"))}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectSheetData.deployments.map((row, k) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{
                    <Link
                      component={RouterLink}
                      to={`/project/${projectSheetData.id}/deployment/${row.id}/details`}
                    >
                      {row.name}
                    </Link>
                  }</StyledTableCell>
                  <StyledTableCell align="center">{row.start_date ? new Date(row.start_date).toLocaleDateString() : null}</StyledTableCell>
                  <StyledTableCell align="center">{row.end_date ? new Date(row.end_date).toLocaleDateString() : null}</StyledTableCell>
                  <StyledTableCell align="center">{getSite(row.site_id)}</StyledTableCell>
                  <StyledTableCell align="center">{getDevices(row.device_id)}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      component={RouterLink}
                      to={`/project/${projectSheetData.id}/deployment/${row.id}/medias`}
                    >
                      <ControlPointIcon />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ProjectDeploymentDeleteModale deploymentId={row.id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack> :
      <Alert severity="warning" >
        <AlertTitle>{capitalize(t("projects.alert"))}</AlertTitle>
        {capitalize(t("projects.alert_msg"))}
      </Alert>
  );
};
export default ProjectDeployments;
