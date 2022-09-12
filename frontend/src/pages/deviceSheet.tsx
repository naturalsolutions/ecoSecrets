import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/breadcrumb";
import DeviceSheet from "../components/deviceSheet/deviceSheetMain";

function DeviceSheetPage() {
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<DeviceSheet />}
      />
    </div>
  );
}

export default DeviceSheetPage;