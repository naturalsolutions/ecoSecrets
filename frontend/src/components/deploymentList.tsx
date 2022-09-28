import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";

const DeploymentList = () => {

  const { project, setCurrentProject } = useMainContext();
  let params = useParams();
  useEffect(() => {
    (async () => {
      setCurrentProject(Number(params.projectId));
    })();
  }, []);

  return (
    <>
      {project() !== undefined ? (
        <>
          <h2>{project().name}</h2>
          {project().deployments.map((d) => (
            <li key={d.name}>
              <Link to={`/deployment/${d.id}`}>{d.name}</Link>
            </li>
          ))}
        </>
      ) : (
        <>
          <h2>projet inconnu</h2>
        </>
      )}
    </>
  );
};
export default DeploymentList;
