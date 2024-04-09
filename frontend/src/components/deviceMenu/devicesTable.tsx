import {
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  capitalize,
  Grid,
} from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DialogYesNo from "../common/dialogYesNo";
import Map from '../Map';

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

const DevicesTable = () => {
  const { deviceMenu, projects, sites } = useMainContext();
  const [position, setPosition] = useState<any>([])


  const updateProjectSheetDataFromDevice = () => {
    
    if (deviceMenu && deviceMenu.length > 0) {

      deviceMenu.map(element => {
        
        projects.forEach(project => {
          
          project.deployments.map(elem => {
            if (element.id == elem.device_id) {

              let pos = sites.find(site => site.id == elem.site_id);

              setPosition(position => [...position, { lat: pos.latitude, lng: pos.longitude, name: pos.name }])
            }
            
          })
        })
      })
    }
  }

  useEffect(() => {
    updateProjectSheetDataFromDevice()
  }, [deviceMenu])


  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return deviceMenu.length !== 0 ? (
    <Stack spacing={2} justifyContent="center">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 500 }}
          size="small"
          aria-label="customized table"
        >
          <TableHead style={{ backgroundColor: "#CCDFD9" }}>
            <TableRow>
              <StyledTableCell align="center">
                {capitalize(t("main.name"))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {capitalize(t("devices.status"))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {capitalize(t("devices.nb_media"))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {capitalize(t("main.remove"))}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceMenu
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">
                    <Link component={RouterLink} to={`/devices/${row.id}`}>{row.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.nb_images}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={handleClickOpen}>
                      <ClearTwoToneIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
              {capitalize(t("devices.delete"))}
            </Typography>
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <ClearTwoToneIcon />
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent>
          <Typography>{capitalize(t("main.unavailable"))}</Typography>
        </DialogContent>
        <Divider />
        <DialogYesNo onYes={() => { return }} onNo={handleClose} />
      </Dialog>
      <Grid container justifyContent="center" alignItems='center'>
        <Grid container item justifyContent="center" height={400} width={1000} spacing={1} style={{ backgroundColor: "#D9D9D9" }}>
          {position.length > 0 ? <Map position={position} zoom={2} /> : <></>}
        </Grid>
      </Grid>
    </Stack>
  ) : (
    <Alert severity="warning">
      <AlertTitle>{capitalize(t("main.warning"))}</AlertTitle>
      {capitalize(t("devices.warning_msg"))}
    </Alert>
  );
};
export default DevicesTable;
