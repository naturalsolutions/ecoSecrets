import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const {projectSheetData} = useMainContext();

  const handleClickOpen = () => {
    console.log('click');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                              <StyledTableCell align="center">{row.name}</StyledTableCell>
                              <StyledTableCell align="center">{row.start_date}</StyledTableCell>
                              <StyledTableCell align="center">{row.end_date}</StyledTableCell>
                              <StyledTableCell align="center">{row.site_name}</StyledTableCell>
                              <StyledTableCell align="center">{row.device_name}</StyledTableCell>
                              <StyledTableCell align="center">Lien vers page import</StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton onClick={handleClickOpen}>
                                  <ClearTwoToneIcon/>
                                </IconButton>
                              </StyledTableCell>
                              </StyledTableRow>
                            ))
                      }
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={handleClose}>
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
                      <IconButton onClick = {handleClose} >
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
                      <Button onClick={handleClose} style={{color: "#BCAAA4"}}>Non</Button>
                    </DialogActions>
                </Dialog>
        </Stack> : 
          <Alert severity="warning" >
            <AlertTitle>Attention !</AlertTitle>
            Vous n'avez pas de déploiements déclarés pour ce projet.
        </Alert>
    );
};
export default ProjectDeployments;