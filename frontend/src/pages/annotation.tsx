import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import AnnotationMain from "../components/annotation/AnnotationMain";
import NavigationPath from "../components/navigationPath";

function Image() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Navigation={<NavigationPath />}
        Main={<AnnotationMain />}
      />
    </div>
  );
}

export default Image;
