import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMainContext } from '../../contexts/mainContext';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useState } from 'react';
import NewDeploymentModale from '../newDeploymentModale';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
    // },
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
  const [openDeleteDeployment, setOpenDeleteDeployment] = useState(false);
  const {projectSheetData} = useMainContext();

  const handleClickOpenDeleteDeployment = () => {
    console.log('click');
    setOpenDeleteDeployment(true);
  };

  const handleCloseDeleteDeployment = () => {
    setOpenDeleteDeployment(false);
  };

    return (
        <Stack 
                spacing={2}
                justifyContent="center"
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={5}
                >
                    <Typography variant="h4" color="#000000" component="div">
                        Déploiements ({projectSheetData.deployments.length})
                    </Typography>

                    <NewDeploymentModale/>
                </Stack>
                
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
                          {projectSheetData.deployments.length !== 0 ?
                        projectSheetData.deployments.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">{
                              <Link 
                                href={`/project/${projectSheetData.id}/deployment/${row.id}`}
                              >
                                {row.name}
                              </Link>
                            }</StyledTableCell>

                            <StyledTableCell align="center">{row.start_date}</StyledTableCell>
                            <StyledTableCell align="center">{row.end_date}</StyledTableCell>
                            <StyledTableCell align="center">{row.site_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.device_name}</StyledTableCell>
                            <StyledTableCell align="center">Lien vers page import</StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton onClick={handleClickOpenDeleteDeployment}>
                                <ClearTwoToneIcon/>
                              </IconButton>
                            </StyledTableCell>
                            </StyledTableRow>
                        )) :  <StyledTableRow key='empty'>
                                <StyledTableCell align="center">Ce projet n'a pas de déploiements</StyledTableCell>
                              </StyledTableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDeleteDeployment} onClose={handleCloseDeleteDeployment}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <DialogTitle>
                      <Typography variant="h6">
                        Supprimer le déploiement
                      </Typography>
                    </DialogTitle>
                      <IconButton onClick = {handleCloseDeleteDeployment} >
                        <ClearTwoToneIcon/>
                      </IconButton>
                    </Stack>
                    <Divider />
                    <DialogContent>
                        <Typography>
                          Êtes-vous sûr de vouloir supprimer ce déploiement ? Cela engendrera la suppression de l'ensemble des médias et des données associées à ce déploiement.
                        </Typography>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                      <Button style={{color: "#2FA37C"}}>Oui</Button>
                      <Button onClick={handleCloseDeleteDeployment} style={{color: "#BCAAA4"}}>Non</Button>
                    </DialogActions>
                </Dialog>
        </Stack>
    );
};
export default ProjectDeployments;