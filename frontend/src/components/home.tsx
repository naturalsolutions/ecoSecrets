import { Stack } from "@mui/material";
import ProjectList from "./projectList";
import StatsHome from "./statsHome";

const Home = () => {
    return (
        <Stack spacing={7}>
            <StatsHome/>
            <ProjectList />
        </Stack>
    );
};
export default Home;