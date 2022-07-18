import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import ProjectContextProvider from "../contexts/projectContext";
import DeploymentList from "../components/deploymentList";

function Project() {
  return (
    <div className="Main">
      <ProjectContextProvider>
        <MainLayout
          Header={<HeadBar />}
          Side={<Drawer />}
          Main={<DeploymentList />}
        />
      </ProjectContextProvider>
    </div>
  );
}

export default Project;
