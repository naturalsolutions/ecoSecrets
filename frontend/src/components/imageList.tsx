import { FC, useEffect, useRef, useState } from "react";
import { useMainContext } from "../contexts/mainContext";
import "../css/first.css";

import ImageMasonry from "./masonry";
import Dropzone from "react-dropzone";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilesService } from "../client";

const ImageList: FC<{}> = () => {
  const [files, setFiles] = useState<any[]>([]);
  const { projects, updateListFile, setCurrentDeployment, project, currentDeployment } =
    useMainContext();
  let params = useParams();

  useEffect(() => {
    (async () => {
      setCurrentDeployment(Number(params.deploymentId));
    })();
  }, [projects]);

  // const Uint8ArrayToHexString = (ui8array: Uint8Array) => {
  //   var hexstring = "",
  //     h;
  //   for (var i = 0; i < ui8array.length; i++) {
  //     h = ui8array[i].toString(16);
  //     if (h.length === 1) {
  //       h = "0" + h;
  //     }
  //     hexstring += h;
  //   }
  //   var p = Math.pow(2, Math.ceil(Math.log2(hexstring.length)));
  //   hexstring = hexstring.padStart(p, "0");
  //   return hexstring;
  // };

  const save = () => {
    for (const file of files) {
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(file);
      // reader.onload = () => {
      //   const digest = crypto.subtle.digest(
      //     "SHA-256",
      //     new Uint8Array(reader.result as ArrayBuffer)
      //   );
      //   digest.then((res) => {
      //     let result = new Uint8Array(res);
      //     var hash = Uint8ArrayToHexString(result);
          FilesService.uploadFileFilesUploadDeploymentIdPost(currentDeployment, { file }).then((res) => {
            updateListFile();
          });
    //     });
    //   };
    }
    clear();
  };

  const clear = () => {
    setFiles([]);
  };

  const loadFile = (f: any) => {
    f.forEach((f) => files.push(f));
    setFiles(files);
  };

  const dropZoneDisplayText = () => {
    if (files.length === 0) {
      return (
        <p>Glissez/Déposez ou cliquez pour importer 10 fichiers maximum</p>
      );
    } else {
      return <p>{files.map((f) => f.name).join(", ")}</p>;
    }
  };

  return (
    <>
      {project() ? (
        <>
          <Dropzone onDrop={loadFile} multiple maxFiles={10}>
            {({ getRootProps, getInputProps }) => (
              <section id="dropzone">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {dropZoneDisplayText()}
                </div>
              </section>
            )}
          </Dropzone>
          <Button variant="outlined" onClick={clear}>
            clear
          </Button>
          <Button variant="outlined" onClick={save}>
            save
          </Button>
          <ImageMasonry></ImageMasonry>
        </>
      ) : (
        <>
          <h2>deploiement inconnu</h2>
        </>
      )}
    </>
  );
};

export default ImageList;
