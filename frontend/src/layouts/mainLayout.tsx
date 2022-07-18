import { Breadcrumbs, Box, Grid, Link, Typography } from "@mui/material";

type MainLayoutProps = {
  Header?: JSX.Element;
  Main?: JSX.Element;
  Side?: JSX.Element;
};

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    MUI
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/material-ui/getting-started/installation/"
  >
    Core
  </Link>,
  <Typography key="3" color="text.primary">
    Breadcrumb
  </Typography>,
];

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
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        {Main}
      </Grid>
    </Grid>
  </Box>
);

export default MainLayout;
