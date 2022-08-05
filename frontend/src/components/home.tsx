
import { Stack } from "@mui/material";
import ProjectList from "./projectList";
import StatsHome from "./statsHome";

const Home = () => {
    return (
        <Stack 
            direction="column"
            spacing={5}
        >
            <StatsHome/>
            <ProjectList />
        </Stack>
    );
};
export default Home;