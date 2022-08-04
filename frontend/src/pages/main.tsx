import First from "../components/first";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import StatsContextProvider from "../contexts/statsContext";
import ProjectList from "../components/projectList";
import Stats from "../components/statsHome";

function Main() {
  return (
    <div className="Main">
      <StatsContextProvider>
        <MainLayout
          Header={<HeadBar />}
          Side={<Drawer />}
          Main={<Stats/>}
        />
      </StatsContextProvider>
    </div>
  );
}

export default Main;
