import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import DeploymentList from "../components/deploymentList";
import NavigationPath from "../components/navigationPath";

function Project() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<DeploymentList />}
      />
    </div>
  );
}

export default Project;
