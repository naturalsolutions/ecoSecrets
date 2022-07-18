import { useMainContext } from "../contexts/mainContext";

const ProjectList = () => {
  const { projects } = useMainContext();
  return (
    <>
      {projects.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </>
  );
};
export default ProjectList;
