import First from "../components/first";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import MainContextProvider from "../contexts/mainContext";
import ProjectList from "../components/projectList";

function Main() {
  return (
    <div className="Main">
      <MainContextProvider>
        <MainLayout
          Header={<HeadBar />}
          Side={<Drawer />}
          Main={<ProjectList />}
        />
      </MainContextProvider>
    </div>
  );
}

export default Main;
