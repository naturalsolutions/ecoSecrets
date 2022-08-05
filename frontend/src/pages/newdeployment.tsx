import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NewDeploymentForm from "../components/newDeploymentForm";
import NavigationPath from "../components/breadcrumb";

function NewDeployment() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<NewDeploymentForm />}
      />
    </div>
  );
}

export default NewDeployment;