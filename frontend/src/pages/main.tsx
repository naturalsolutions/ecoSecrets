import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from '../components/breadcrumb';
import ProjectList from "../components/projectList";

function Main() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<ProjectList />}
      />
    </div>
  );
}

export default Main;
