import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertTitle, Link, Paper, Stack } from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import { useState } from 'react';
import ProjectDeploymentDeleteModale from './projectDeploymentsDeleteModale';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  // const header = ['Nom', 'Date de début', 'Date de fin', 'Nom du site', 'Nom du dispositif', 'Voir la fiche déploiment', 'Supprimer le déploiement'];


const ProjectDeployments = () => {
  const { projectSheetData } = useMainContext();

  // useEffect(() => {
  //     updateProjectSheetData();
  // }, []);



    return (
      projectSheetData.deployments.length !== 0 ?
        <Stack 
            spacing={2}
            justifyContent="center"
        > 

          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead style={{backgroundColor: "#CCDFD9"}}>
                    <TableRow>
                        <StyledTableCell align="center">Nom</StyledTableCell>
                        <StyledTableCell align="center">Date de début</StyledTableCell>
                        <StyledTableCell align="center">Date de fin</StyledTableCell>
                        <StyledTableCell align="center">Nom du site</StyledTableCell>
                        <StyledTableCell align="center">Nom du dispositif</StyledTableCell>
                        <StyledTableCell align="center">Importer des médias</StyledTableCell>
                        <StyledTableCell align="center">Supprimer le déploiement</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {projectSheetData.deployments.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell align="center">{
                        <Link 
                          href={`/project/${projectSheetData.id}/deployment/${row.id}`}
                        >
                          {row.name}
                        </Link>
                      }</StyledTableCell>
                        <StyledTableCell align="center">{row.start_date ? new Date(row.start_date).toLocaleDateString() : null}</StyledTableCell>
                        <StyledTableCell align="center">{row.end_date ? new Date(row.end_date).toLocaleDateString() : null}</StyledTableCell>
                        <StyledTableCell align="center">{row.site_name}</StyledTableCell>
                        <StyledTableCell align="center">{row.device_name}</StyledTableCell>
                        <StyledTableCell align="center">Lien vers page import</StyledTableCell>
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
            <AlertTitle>Attention !</AlertTitle>
            Vous n'avez pas de déploiements déclarés pour ce projet.
        </Alert>
    );
};
export default ProjectDeployments;