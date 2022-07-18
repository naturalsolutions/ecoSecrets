import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type MainLayoutProps = {
  Header?: JSX.Element;
  Main?: JSX.Element;
  Side?: JSX.Element;
};

export const MainLayout = ({
  Header,
  Main,
  Side,
  ...rest
}: MainLayoutProps) => (
  <Box sx={{ flexGrow: 1 }}>
    {Header}
    <Grid container sx={{ py: 2 }} spacing={2}>
      <Grid item>{Side}</Grid>
      <Grid item xs={12} md={6} lg={8}>
        {Main}
      </Grid>
    </Grid>
  </Box>
);

export default MainLayout;
