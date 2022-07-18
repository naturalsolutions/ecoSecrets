import First from "../components/first";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import ProjectProvider from "../contexts/projectProvider";

function Deployment() {
  return (
    <div className="Main">
      <ProjectProvider>
        <MainLayout Header={<HeadBar />} Side={<Drawer />} Main={<First />} />
      </ProjectProvider>
    </div>
  );
}

export default Deployment;
