import { Box, Grid } from "@mui/material";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

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
  <Box>
    {Header}
    <Grid
      container
      sx={{ height: "calc(100vh - 72px)" }}
      justifyContent="center"
    >
      <Grid
        size={{ lg: 11, md: 11, xs: 12}}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {Navigation}
        {Main}
      </Grid>
    </Grid>
  </Box>
);
export default MainLayout;
