import { Alert, Divider, FormControlLabel, Paper, Stack, styled, Switch, Tab, Tabs, Typography, capitalize } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import { v4 as uuidv4 } from 'uuid';
import { Annotation, FilesService } from "../client";
import AnnotationObservationForm from "./annotationObservationForm";
import AnnotationImageDisplay from "./annotationImageDisplay";
import AnnotationButtons from "./annotationButtons";
import AnnotationSaveError from "./annotationSaveError";
import "../css/annotation.css";
import TabPanel from "./tabPanel";
import ButtonStatus from "./common/buttonStatus";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useTranslation } from "react-i18next";


const fieldsMandatory = ["specie", "classe", "order", "genus", "family"]
const LayoutImageContainer = styled("div")({
  flexGrow: 1,
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  columnGap: "1rem",
  rowGap: "1rem",
});

const LayoutImageImage = styled("div")(({ theme }) => ({
  gridColumn: "1/8",
  [theme.breakpoints.down("md")]: {
    gridColumn: "1/13",
    gridRow: "1/5",
  }
}));

const LayoutImageForm = styled("div")(({ theme }) => ({
  gridColumn: "8/13",
  [theme.breakpoints.down("md")]: {
    gridColumn: "1/13",
    gridRow: "5/9",
  },
  overflowY: "scroll",
}));

const AnnotationMainComponent = () => {
  const { t } = useTranslation()
  const {
    projects,
    setCurrentDeployment,
    currentImage, setCurrentImage,
    files,
    updateListFile,
    setCurrentProject
  } = useMainContext();

  let params = useParams();
  const [isAnnoted, setIsAnnoted] = useState<undefined | boolean>(undefined)
  const [treated, setTreated] = useState<undefined | boolean>(undefined)
  const [observations, setObservations] = useState<Annotation[]>([]);
  const tmpObservation = { id: uuidv4(), classe: "", order: "", family: "", genus: "", specie: "", life_stage: "", biological_state: "", comment: "", behaviour: "", sex: "", number: 0 };
  const [isMinimalObservation, setIsMinimalObservation] = useState(observations.length == 0)

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [openSaveErrorDialog, setOpenSaveErrorDialog] = useState(false);
  const handleCloseSaveErrorDialog = () => {
    setOpenSaveErrorDialog(false);
  };

  const image = (): any | null => {
    return files.find((f) => f.id === currentImage);
  };

  useEffect(() => {
    (async () => {
      setCurrentDeployment(Number(params.deploymentId));
      setCurrentImage(params.imageId);
      setCurrentProject(Number(params.projectId));
    })();
  }, [projects]);

  useEffect(() => {
    (async () => {
      image() && setObservations(image().annotations);
      image() && setTreated(image().treated)
    })();
  }, [files, currentImage]);

  useEffect(() => {
    (async () => {
      setChecked(observations.length === 0);
    })();
  }, [observations]);

  const updateUrl = (id) => {
    const url = new URL(window.location.toString());
    url.pathname = `/project/${Number(params.projectId)}/deployment/${Number(params.deploymentId)}/medias/${id}`;
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
  const lastOrFirstImage = (indice) => {
    if (indice == 'first') {
      setCurrentImage(files[0].id);
      updateUrl(files[0].id);
    }
    if (indice == 'last') {
      setCurrentImage(files[files.length - 1].id);
      updateUrl(files[files.length - 1].id);
    }
  };

  const save = () => {
    FilesService
      .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, observations)
      .then(res =>
        updateListFile()
      )
    // WARNING remplacer le updateListFile par une mise à jour local des fichiers
  };

  const saveandnext = () => {
    if (isMinimalObservation) {
      save();
      next();
    }
    else {
      setOpenSaveErrorDialog(true);
    }
  };

  const handleAddObservation = () => {
    if (isMinimalObservation) {
      setObservations([...observations, tmpObservation]);
    };
    if (checked) {
      setChecked(false);
    };
    setIsMinimalObservation(false);
  };

  const handleDeleteObservation = (id: string) => {
    let i = observations && observations.findIndex((obs) => obs.id === id);
    let tmp_obs = [...observations]
    i !== -1 && tmp_obs.splice(i, 1);
    i !== -1 && setObservations(tmp_obs);
    i === observations.length - 1 && setIsMinimalObservation(true);
  };

  const [checked, setChecked] = useState<boolean>(observations.length !== 0);

  const handleCheckChange = () => {
    if (!checked) {
      setObservations([]);
      setIsMinimalObservation(true);
    };
    if (checked) {
      setObservations([...observations, tmpObservation]);
      setIsMinimalObservation(false);
    };
    setChecked(!checked);
  };

  const handleFormChange = (id: string, params: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let tmp_obs = [...observations]
    // console.log("tmp_obs", tmp_obs)
    tmp_obs.forEach(ob => {
      // console.log("id obs", ob.id)
      // console.log("params", params)
      console.log(ob);
      if (ob.id === id) {
        ob[params] = e.target.value;
        if (params === 'specie'){
          ob[params] = e.target.innerHTML;
        }
        if (["specie", "classe", "order", "genus"].includes(params) && ob[params] != " ") {
          ob["number"] = 1;
          setIsMinimalObservation(true);
        }
      }
    })
    setObservations(tmp_obs);
  };

  useEffect(() => {
    let fieldToCheck: string[] = [];
    // console.log("obs inside useEffect change", observations)
    for (var i = 0; i < observations.length; i++) {
      // console.log(observations[i]);

      for (const property in observations[i]) {
        // console.log(`${property}: ${object[property]}`);
        if (fieldsMandatory.includes(property)) {
          // console.log("observations[i][property]", observations[i][property])
          fieldToCheck.push(observations[i][property])
        }
      }

    }
    // console.log("fieldToCheck", fieldToCheck)
    const result = fieldToCheck.some(element => {
      if (element !== '') {
        return true
      } else {
        return false
      }
    });

    console.log("is Annoted", result)
    setIsAnnoted(result)
  }, [handleCheckChange])
  return (
    <LayoutImageContainer className="page">

      <LayoutImageImage>
        <AnnotationImageDisplay image={image()} next={next} previous={previous} lastOrFirstImage={lastOrFirstImage} isAnnoted={isAnnoted}/>
      </LayoutImageImage >

      <LayoutImageForm className="annotations">
        <Paper elevation={1} className='paperAnnotations'>
          <Stack spacing={2} className='stackAnnotations'>
            <Typography component={"span"} variant="h3">{capitalize(t("annotations.annotation"))}</Typography>
            <Tabs
              value={tabValue}
              aria-label="basic tabs example"
              variant='fullWidth'
              onChange={handleTabChange}
            >
              <Tab label={capitalize(t("observations.observations_maybe_plural"))}/>
              <Tab label={capitalize(t("annotations.metadata"))} />
            </Tabs>

            <TabPanel valueTab={tabValue} index={0}>
              <div className="info-annotation-ctn">
                {treated ?
                  <ButtonStatus icon={<CheckCircleRoundedIcon sx={{ color: '#4CAF50' }} />} title={capitalize(t("annotations.media_processed_manually"))} stylClassButton="valid" />
                  : (
                    isAnnoted ?
                      <ButtonStatus icon={<HelpRoundedIcon sx={{ color: '#FF9800' }} />} title={capitalize(t("observations.not_saved"))} stylClassButton="info" />
                      :
                      <ButtonStatus icon={<HelpRoundedIcon sx={{ color: '#F44336' }} />} title={capitalize(t("annotations.media_not_processed"))} stylClassButton="warning" />
                  )

                }
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleCheckChange} />
                  }
                  label={capitalize(t("annotations.empty_media"))}
                />
              </div >

              <Divider />

              {
                observations.map((observation) => (
                  <AnnotationObservationForm key={observation.id} observation={observation} handleFormChange={handleFormChange} handleCheckChange={handleCheckChange} handleDeleteObservation={handleDeleteObservation} />
                ))
              }
            </TabPanel >

            <TabPanel valueTab={tabValue} index={1}>
              <Alert severity="info">{capitalize(t("main.unavailable"))}.</Alert>
            </TabPanel >

            <Divider />

            <AnnotationButtons
              saveandnext={saveandnext}
              handleAddObservation={handleAddObservation}
            />

          </Stack >
        </Paper >
      </LayoutImageForm >

      <AnnotationSaveError
        openSaveErrorDialog={openSaveErrorDialog} handleCloseSaveErrorDialog={handleCloseSaveErrorDialog}
      />
    </LayoutImageContainer >
  );
};
export default AnnotationMainComponent;