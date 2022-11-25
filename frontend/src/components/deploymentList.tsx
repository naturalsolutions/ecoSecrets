import { Link } from "@mui/material";
import { useEffect } from "react";
import { useMainContext } from "../contexts/mainContext";
import {useParams, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { capitalize } from "@mui/material";

const DeploymentList = () => {
  const { t } = useTranslation()

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
              <Link component={RouterLink} to={`/deployment/${d.id}`}>{d.name}</Link>
            </li>
          ))}
        </>
      ) : (
        <>
          <h2>{capitalize(t("projects.unknown"))}</h2>
        </>
      )}
    </>
  );
};
export default DeploymentList;
