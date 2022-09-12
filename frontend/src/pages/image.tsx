import AnnotationMainComponent from "../components/annotationMainComponent";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/breadcrumb";

function Image() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<AnnotationMainComponent />}
      />
    </div>
  );
}

export default Image;
