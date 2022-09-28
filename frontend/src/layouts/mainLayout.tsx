import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";

type MainLayoutProps = {
  Header?: JSX.Element;
  Navigation?: JSX.Element;
  Main?: JSX.Element;
  Side?: JSX.Element;
};

export const MainLayout = ({
  Header,
  Navigation,
  Main,
  Side,
  ...rest
}: MainLayoutProps) => (
  <Container style={{
    minWidth: "100%",
    height: "100vh",
  }}>
    <Box sx={{ flexGrow: 1 }}>
      {Header}
      <Grid container sx={{ height: "90vh" }} spacing={2}>
        <Grid item sx={{ height: "100%" }} xs={12} md={1} lg={1}>{Side}</Grid>
        <Grid item sx={{ height: "100%" }} xs={12} md={11} lg={11}>
          {Navigation}
          {Main}
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default MainLayout;
