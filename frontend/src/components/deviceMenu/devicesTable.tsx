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

const DevicesTable = () => {

  const {deviceMenu} = useMainContext();
  const [open, setOpen] = useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
        
    return (
      deviceMenu.length !== 0 ?
      <Stack 
        spacing={2}
        justifyContent="center"
      > 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} size="small" aria-label="customized table">
                <TableHead style={{backgroundColor: "#CCDFD9"}}>
                <TableRow>
                    <StyledTableCell align="center">Nom</StyledTableCell>
                    <StyledTableCell align="center">Statut</StyledTableCell>
                    <StyledTableCell align="center">Nombre de médias</StyledTableCell>
                    <StyledTableCell align="center">Supprimer</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    { deviceMenu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">
                              <Link 
                                href={`/devices/${row.id}`}
                              >
                                {row.name}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center">{row.nb_images}</StyledTableCell>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={deviceMenu.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={open} onClose={handleClose}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <DialogTitle>
            <Typography variant="h6">
              Supprimer le dispositif
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
     Vous n'avez pas de pièges photographiques enregistrés.
 </Alert>
);
    };
export default DevicesTable;