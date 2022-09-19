import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/navigationPath";
import ProjectSheet from "../components/projectSheet/projectSheetMain";

function ProjectSheetPage() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<ProjectSheet />}
      />
    </div>
  );
}

export default ProjectSheetPage;