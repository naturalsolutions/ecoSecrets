import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ImportModale from "./importModale";
import { Button } from "@mui/material";

const HeadBar = () => {

  const [openImport, setOpenImport] = useState(false);

  const openImportModale = () => {
      setOpenImport(true);
  };
  
  const closeImportModale = () => {
      setOpenImport(false);
  };

  return (
    <AppBar
      position="static"
      sx={{ paddingTop: 2, paddingBottom: 1 }}
    >
      <Toolbar variant="dense">
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <VideoCameraBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex", color: "white" } }}
          >
            FASTcam
          </Typography>
          <Box></Box>
        </Grid>

        <IconButton 
            onClick={openImportModale}
            sx={{ mr: 4, display: {color: "white"} }}
        >
            <CloudDownloadIcon />
        </IconButton>
        
        <ImportModale 
            open={openImport} 
            close={closeImportModale}
        />

        <Typography variant="h6" color="white" component="div" sx={{ mr: 1 }}>
            FR
        </Typography>
        <IconButton  aria-label="menu" sx={{ mr: 4, display: {color: "white"} }}>
            < KeyboardArrowDownIcon />
        </IconButton>
        <IconButton aria-label="menu" sx={{ mr: 2, display: {color: "white"} }}>
            < AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default HeadBar;
