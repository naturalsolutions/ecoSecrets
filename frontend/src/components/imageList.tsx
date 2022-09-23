import { FC, useEffect, useState } from "react";
import { useMainContext } from "../contexts/mainContext";
import "../css/first.css";

import ImageMasonry from "./masonry";
import Dropzone from "react-dropzone";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FilesService } from "../client";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ImageList: FC<{}> = () => {
  const [files, setFiles] = useState<any[]>([]);
  const { projects, updateListFile, setCurrentDeployment, currentDeployment, deploymentData } =
    useMainContext();
  let params = useParams();

  useEffect(() => {
    (async () => {
      setCurrentDeployment(Number(params.deploymentId));
    })();
  }, [projects]);

  const save = () => {
    for (const file of files) {
      FilesService
      .uploadFileFilesUploadDeploymentIdPost(Number(params.deploymentId), { file })
      .then((res) => {
        updateListFile();
      });
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
      {deploymentData ? (
        <Stack spacing={2}>
          <Typography variant="subtitle2">Import de médias</Typography>
          <Dropzone onDrop={loadFile} multiple maxFiles={10}>
            {({ getRootProps, getInputProps }) => (
              <section id="dropzone">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Grid container direction="column" alignItems='center'>
                    <Grid item>
                      <CameraAltIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                      {dropZoneDisplayText()}
                    </Grid>
                  </Grid>

                </div>
              </section>
            )}
          </Dropzone>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button 
              onClick={clear} 
              color="primary"
            >
              Annuler
            </Button>
            <Button 
              variant="contained" 
              onClick={save} 
              color="primary"
            >
              Enregistrer
            </Button>
          </Stack>
          <ImageMasonry />
        </Stack>
      ) : (
        <Stack>
          <p>deploiement inconnu</p>
        </Stack>
      )}
    </>
  );
};

export default ImageList;
