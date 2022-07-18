import { Link } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";

const ProjectList = () => {
  const { projects } = useMainContext();
  return (
    <>
      {projects.map((p) => (
        <li key={p.name}>
          <Link to={`/project/${p.name}`}>{p.name}</Link>
        </li>
      ))}
    </>
  );
};
export default ProjectList;
