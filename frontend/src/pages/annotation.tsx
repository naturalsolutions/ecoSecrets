import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import NavigationPath from "../components/navigationPath";
import AnnotationContextProvider from "../contexts/annotationContext";
import AnnotationMain from "../components/annotation/AnnotationMain";
import MediaFilters from "../components/deployments/Filters";
import { useFilesContext } from "../contexts/filesContext";

function Annotation() {
  let params = useParams();
  const navigate = useNavigate();
  const { files } = useFilesContext();
  const currentProject = params.projectId;
  const currentDeployment = params.deploymentId;

  useEffect(() => {
    if (
      (currentProject && currentDeployment && files.length === 0) ||
      !files.some((file) => file.id === params.imageId)
    ) {
      const url = `/project/${Number(currentProject)}/deployment/${Number(
        currentDeployment
      )}/medias`;

      if (window.location.pathname !== url) {
        navigate(url, { replace: true });
      }
    }
  }, [currentProject, currentDeployment, files, navigate]);
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Navigation={<NavigationPath />}
        Main={
          <AnnotationContextProvider>
            <MediaFilters />
            <AnnotationMain />
          </AnnotationContextProvider>
        }
      />
    </div>
  );
}

export default Annotation;
