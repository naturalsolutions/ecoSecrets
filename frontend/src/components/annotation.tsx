import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";

const Annotation = () => {
  const {
    projects,
    setCurrentDeployment,
    setCurrentImage,
    currentDeployment,
    currentImage,
    files,
  } = useMainContext();
  let params = useParams();

  const image = (): any | null => {
    return files.find((f) => f.id === currentImage);
  };

  useEffect(() => {
    (async () => {
      setCurrentDeployment(Number(params.deploymentId));
      setCurrentImage(params.imageId);
    })();
  }, [projects]);

  const updateUrl = (id) => {
    console.log(window.location);
    const url = new URL(window.location.toString());
    console.log(url);
    url.pathname = `deployment/${Number(params.deploymentId)}/${id}`;
    window.history.pushState({}, "", url);
  };

  const previous = () => {
    files.forEach((f, i) => {
      if (f.id === currentImage) {
        let ind = i === 0 ? (i = files.length) : i;
        setCurrentImage(files[ind - 1].id);
        updateUrl(files[ind - 1].id);
      }
    });
  };

  const next = () => {
    files.forEach((f, i) => {
      if (f.id === currentImage) {
        let ind = i === files.length - 1 ? -1 : i;
        setCurrentImage(files[ind + 1].id);
        updateUrl(files[ind + 1].id);
      }
    });
  };

  return (
    <>
      {image() ? (
        <>
          <img
            src={`${image().url}`}
            alt={image().name}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: "block",
              width: "50%",
            }}
          />
          <Button variant="contained" onClick={() => previous()}>
            PREVIOUS
          </Button>
          <Button variant="contained" onClick={() => next()}>
            NEXT
          </Button>
        </>
      ) : (
        <>
          <h2>image inconnue</h2>
        </>
      )}
    </>
  );
};
export default Annotation;
