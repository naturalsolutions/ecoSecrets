import First from "../components/imageList";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/breadcrumb";

function Deployment() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<First />}
      />
    </div>
  );
}

export default Deployment;
