import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Link, Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useState } from "react";

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

const SitesTable = () => {
  const {sites} = useMainContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
        
    return (
      sites.length !== 0 ?
      <Stack 
        spacing={2}
        justifyContent="center"
      > 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} size="small" aria-label="customized table">
                <TableHead style={{backgroundColor: "#CCDFD9"}}>
                <TableRow>
                    <StyledTableCell align="center">Nom</StyledTableCell>
                    <StyledTableCell align="center">Latitude</StyledTableCell>
                    <StyledTableCell align="center">Longitude</StyledTableCell>
                    <StyledTableCell align="center">Supprimer</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    { sites.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">
                              <Link 
                                href={`/sites/${row.id}`}
                              >
                                {row.name}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.latitude}</StyledTableCell>
                            <StyledTableCell align="center">{row.longitude}</StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton onClick={handleClickOpen}>
                                  <ClearTwoToneIcon/>
                                </IconButton>
                              </StyledTableCell>

                        </StyledTableRow>
                    )) }
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
              Supprimer le site
            </Typography>
          </DialogTitle>
            <IconButton onClick = {handleClose} >
              <ClearTwoToneIcon/>
            </IconButton>
          </Stack>
          <Divider />
          <DialogContent>
              <Typography>
               Désolé, cette fonctionnalité n'est pas encore disponible !
              </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button >Oui</Button>
            <Button onClick={handleClose} color='secondary'>Non</Button>
          </DialogActions>
      </Dialog>
    </Stack>
     : <Alert severity="warning" >
     <AlertTitle>Attention !</AlertTitle>
     Vous n'avez pas de sites enregistrés.
 </Alert>
);
    };
export default SitesTable;