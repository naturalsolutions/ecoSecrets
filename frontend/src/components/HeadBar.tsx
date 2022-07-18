// import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const HeadBar = () => {
  return (
    <AppBar
      position="static"
      sx={{ paddingTop: 2, paddingBottom: 1, background: "white" }}
    >
      <Toolbar>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex", color: "black" } }}
          >
            Annotation
          </Typography>
          <Box></Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default HeadBar;
