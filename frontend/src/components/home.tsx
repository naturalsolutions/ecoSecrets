
import { Stack } from "@mui/material";
import ProjectList from "./projectList";
import StatsHome from "./statsHome";
import { Grid } from "@mui/material";

const Home = () => {
    return (
        // <Stack 
        //     direction="column"
        //     spacing={7}
        // >
        //     <StatsHome/>
        //     <ProjectList />
        // </Stack>
        
        <Stack spacing={7}>
            <StatsHome/>
            <ProjectList />
        </Stack>
    );
};
export default Home;