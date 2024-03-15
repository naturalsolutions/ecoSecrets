import SiteMenu from "../components/siteMenu/siteMenuMain";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/navigationPath";

function SiteMenuPage() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<SiteMenu/>}
      />
    </div>
  );
}
export default SiteMenuPage;