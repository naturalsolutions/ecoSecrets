import DeviceMenu from "../components/deviceMenu/deviceMenuMain";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/navigationPath";

function DeviceMenuPage() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<DeviceMenu/>}
      />
    </div>
  );
}

export default DeviceMenuPage;