import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Link, Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Typography, capitalize } from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
                    <StyledTableCell align="center">{capitalize(t('main.name'))}</StyledTableCell>
                    <StyledTableCell align="center">{capitalize(t('sites.latitude'))}</StyledTableCell>
                    <StyledTableCell align="center">{capitalize(t('sites.longitude'))}</StyledTableCell>
                    <StyledTableCell align="center">{capitalize(t('main.delete'))}</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    { sites.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">
                              <Link component={RouterLink} to ={`/sites/${row.id}`}>
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
            {capitalize(t('sites.delete_site'))}
            </Typography>
          </DialogTitle>
            <IconButton onClick = {handleClose} >
              <ClearTwoToneIcon/>
            </IconButton>
          </Stack>
          <Divider />
          <DialogContent>
              <Typography>
                {capitalize(t('main.unavailable'))}
              </Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button >{capitalize(t('main.yes'))}</Button>
            <Button onClick={handleClose} color='secondary'>{capitalize(t('main.no'))}</Button>
          </DialogActions>
      </Dialog>
    </Stack>
     : <Alert severity="warning" >
     <AlertTitle>{t('main.warning')}</AlertTitle>
     {`${capitalize(t('main.zero'))} ${t('sites.site')}`}
 </Alert>
);
    };
export default SitesTable;