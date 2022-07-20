import First from "../components/imageList";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import MainContextProvider from "../contexts/mainContext";
import NavigationPath from "../components/breadcrumb";

function Deployment() {
  return (
    <div className="Main">
      <MainContextProvider>
        <MainLayout 
          Header={<HeadBar />} 
          Side={<Drawer />} 
          Navigation={<NavigationPath />}
          Main={<First />} />
      </MainContextProvider>
    </div>
  );
}

export default Deployment;
