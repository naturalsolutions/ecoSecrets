import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";

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

    const devices = [
        {'id': 1, "name": "MonDispositif", "projet": "MonProjet", "img":'200'},
        {'id': 2, "name": "MonDispositif2", "projet": "", "img":'900'},
        {'id': 2, "name": "MonDispositif3", "projet": "MonProjet3", "img":'900'},
    ]
        
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead style={{backgroundColor: "#CCDFD9"}}>
                <TableRow>
                    <StyledTableCell align="center">Nom</StyledTableCell>
                    <StyledTableCell align="center">Projet</StyledTableCell>
                    <StyledTableCell align="center">Nombre de médias</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {devices.length !==0 ? devices.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.projet}</StyledTableCell>
                            <StyledTableCell align="center">{row.img}</StyledTableCell>
                        </StyledTableRow>
                    )) :  <StyledTableRow key='empty'>
                            <StyledTableCell align="center">Ce projet n'a pas de déploiements</StyledTableCell>
                            </StyledTableRow>}
                </TableBody>
            </Table>
        </TableContainer>
     );
    };
export default DevicesTable;