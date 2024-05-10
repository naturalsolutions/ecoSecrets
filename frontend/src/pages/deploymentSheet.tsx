import MainLayout from "../layouts/mainLayout";
import HeadBar from "../components/HeadBar";
import Drawer from "../components/drawer";
import NavigationPath from "../components/navigationPath";
import DeploymentDetails from "../components/deploymentDetails";
import { useEffect, useState } from "react";
import { useMainContext } from "../contexts/mainContext";
import { ProjectWithDeployment } from "../client";
import { useParams } from "react-router-dom";


function DeploymentSheet(props) {
  const {project, deploymentData, setCurrentDeployment, setCurrentProject, updateDeploymentData } = useMainContext()
  const [actualProject, setActualProject] = useState<ProjectWithDeployment | undefined>();
  const [is404, setIs404] = useState<boolean | null>(null)
  const [renderNumber, setRenderNumber] = useState<number>(0)

  let params = useParams();
  
  useEffect(() => {

    setCurrentDeployment(Number(params.deploymentId));
    setCurrentProject(Number(params.projectId));

    setRenderNumber(prev => prev + 1)
    
    setActualProject(project())


        if(actualProject?.deployments != undefined && deploymentData != undefined)
            {
 
                if(actualProject?.deployments[0]?.project_id == Number(params.projectId) && deploymentData.project_id == Number(params.projectId)){
                    setIs404(false)

                }  
                else {
                  setIs404(true)

                }   
            }   
        else {
          if(renderNumber >= 3){ // actualProject et deploymentData s'actualise au troisième render render
            setIs404(true)
          }
        }
}, [deploymentData, actualProject]);
  
  return (
    <div className="Main">
      <MainLayout
        Header={<HeadBar />}
        Side={<Drawer />}
        Navigation={<NavigationPath />}
        Main={<DeploymentDetails number={props.number}/>}
        is404={is404}
      />
    </div>
  );
}

export default DeploymentSheet;