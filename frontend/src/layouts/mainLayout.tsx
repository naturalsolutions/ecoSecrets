import { Box, Grid } from "@mui/material";

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
  <Box sx={{ flexGrow: 1 }}>
    {Header}
    <Grid container sx={{ py: 2 }} spacing={2}>
      <Grid item>{Side}</Grid>
      <Grid item xs={12} md={6} lg={8}>
        {Navigation}
        {Main}
      </Grid>
    </Grid>
  </Box>
);

export default MainLayout;
