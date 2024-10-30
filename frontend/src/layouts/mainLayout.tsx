import { Box, Grid } from "@mui/material";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

type MainLayoutProps = {
  Header?: JSX.Element;
  Navigation?: JSX.Element;
  Main?: JSX.Element;
  Side?: JSX.Element;
  is404?: boolean | null;
};

export const MainLayout = ({
  Header,
  Navigation,
  Main,
  Side,
  is404,
  ...rest
}: MainLayoutProps) => (
  <Box>
    {Header}
    <Grid
      container
      sx={{ height: "calc(100vh - 72px)" }}
      justifyContent="center"
    >
    {is404 === null ? (
    <></>
  ) : !is404 ? <Grid
        item
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        xs={12}
        md={11}
        lg={11}
      >
        {Navigation}
        {Main}
      </Grid> : <>{<h1>Error 404 : Page not found</h1>}</>}
    </Grid>
  </Box>
);
export default MainLayout;
