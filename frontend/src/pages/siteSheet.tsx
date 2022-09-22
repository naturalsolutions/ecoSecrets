import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/navigationPath";
import SiteSheet from "../components/siteSheet/siteSheetMain";

function SiteSheetPage() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<SiteSheet />}
      />
    </div>
  );
}

export default SiteSheetPage;