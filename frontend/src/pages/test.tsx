import Drawer from "../components/drawer";
import HeadBar from "../components/HeadBar";
import NavigationPath from "../components/navigationPath";
import MainLayout from "../layouts/mainLayout";

function Test() {
  return (
    <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<div style={{ width: "100%", height: "100vh" }}>
      {/* iframe loads Shiny app at /shiny/ */}
      <iframe
        src="/shiny/"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />

    </div>}
      />

  );
}

export default Test;
