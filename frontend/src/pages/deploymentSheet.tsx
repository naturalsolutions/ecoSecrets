import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/breadcrumb";
import DeploymentForm from "../components/deploymentForm";


function DeploymentSheet() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<DeploymentForm />}
      />
    </div>
  );
}

export default DeploymentSheet;