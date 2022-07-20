import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";

const DeploymentList = () => {
  const { project, setProject, deployments } = useMainContext();
  let params = useParams();
  useEffect(() => {
    (async () => {
      setProject(params.projectId);
    })();
  }, []);

  return (
    <>
      <h2>{project}</h2>
      {deployments.map((d) => (
        <li key={d.name}>
          <Link to={`/deployment/${d.name}`}>{d.name}</Link>
        </li>
      ))}
    </>
  );
};
export default DeploymentList;
