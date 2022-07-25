import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, MenuItem, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { v4 as uuidv4 } from 'uuid';
import "../css/annotation.css";
import React from "react";

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

type AnnotationType = {
  id:string;
  species:string, 
  number: number, 
  sex: string, 
  behaviour: string, 
  lifeStage: string, 
  biologicalState: string;
  comment: string;
}

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
    const url = new URL(window.location.toString());
    url.pathname = `deployment/${Number(params.deploymentId)}/${id}`;
    window.history.pushState({}, "", url);
  };

  const previous = () => {
    files.forEach((f, i) => {
      if (f.id === currentImage) {
        let ind = i === 0 ? (i = files.length) : i;
        setCurrentImage(files[ind - 1].id);
        setObservations([])
        updateUrl(files[ind - 1].id);
      }
    });
  };

  const next = () => {
    files.forEach((f, i) => {
      if (f.id === currentImage) {
        let ind = i === files.length - 1 ? -1 : i;
        setCurrentImage(files[ind + 1].id);
        setObservations([])
        updateUrl(files[ind + 1].id);
      }
    });
  };

  const save = () => {
    console.log(observations)
  };

  const saveandnext = () => {
    save();
    next();
  };

  const sexList = ["Mâle", "Femelle", "Indéterminé"];
  const behaviourList = ["Comportement A", "Comportement B", "Comportement C"];
  const lifeStageList = ["Oeuf", "Juvénile", "Adulte"];
  const biologicalStateList = ["Vivant", "Mort"];
  
  const [observations, setObservations] = useState<AnnotationType[]>([]);

  const handleAddObservation = () => {
    setObservations([...observations, { id: uuidv4(), species: '', number: 0, sex: '', behaviour: '', lifeStage: '', biologicalState: '', comment: "" }])
  }

  const handleDeleteObservation = (id: string) => {
    let i = observations && observations.findIndex((obs) => obs.id === id);
    let tmp_obs = [...observations]
    i !== -1 && tmp_obs.splice(i,1);
    i !== -1 && setObservations(tmp_obs);
  }

  const imageIndex = () => {
    return (files && files.findIndex((f) => f.id === currentImage));
  } 

  const handleChange = (id: string, params:string,  e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    let tmp_obs = [...observations]
    tmp_obs.forEach(ob => {
      if(ob.id === id){
        ob[params] = e.target.value
      }
    })
    setObservations(tmp_obs);
  }

  return (
    <LayoutImageContainer>
      <LayoutImageImage>{
        image() ? (
          <Box sx={{ height: 300}}>
            <img
              src={`${image().url}`}
              alt={image().name}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                height: "200%",
                maxWidth: "100%"
              }}
            />
            <div className="groupNumber">
              <IconButton  
                onClick={() => previous()} 
                style={{
                  color: "black"
                }}
              >
                <ArrowBackIosIcon/>
              </IconButton>
              <span className="numero">{imageIndex()}</span>
              <span className="numero">{files.length}</span>
              <IconButton  
                onClick={() => next()}
                style={{
                  color: "black"
                }}
              >
                <ArrowForwardIosIcon/>
              </IconButton>
            </div>
          </Box>
        ) : (
          <>
            <h2>image inconnue</h2>
          </>
        )}
      </LayoutImageImage>
      <LayoutImageForm>
        <Stack spacing={2}>
          <Typography variant="h3">Annotation</Typography>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
          {
            observations.map((observation) => (
              <form key={observation.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Typography variant="h6">{`Observation ${observation.id}`}</Typography>
                  <IconButton onClick = {() => handleDeleteObservation(observation.id)} >
                    <ClearTwoToneIcon/>
                  </IconButton>
                </Stack>

                <Grid container spacing={1}>
                  <Grid item lg={6}>
                    <TextField
                      name="species"
                      label="Espèce"
                      size="small"
                      fullWidth
                      value={observation.species}
                      onChange={(e) => handleChange(observation.id, "species", e)}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      name="number"
                      label="Nombre d'individus"
                      size="small"
                      inputProps={{ type: 'number' }}
                      value={observation.number}
                      onChange={(e) => handleChange(observation.id, "number", e)}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="sexe"
                      select
                      label="Sexe"
                      value={observation.sex}
                      onChange={(e) => handleChange(observation.id, "sex", e)}
                      size="small"
                      fullWidth
                    >
                      {sexList.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="behaviour"
                      select
                      label="Comportement"
                      size="small"
                      value={observation.behaviour}
                      onChange = {(e) => handleChange(observation.id, "behaviour",e)}
                      fullWidth
                    >
                      {behaviourList.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="lifeStage"
                      select
                      label="Stade de vie"
                      size="small"
                      value={observation.lifeStage}
                      onChange={(e) => handleChange(observation.id, "lifeStage", e)}
                      fullWidth
                    >
                      {lifeStageList.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      id="biologicalState"
                      select
                      label="Etat biologique"
                      size="small"
                      value={observation.biologicalState}
                      onChange={(e) => handleChange(observation.id, "biologicalState", e)}
                      fullWidth
                    >
                      {biologicalStateList.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      id="comment"
                      name="comment"
                      label="Commentaire"
                      size="small"
                      value={observation.comment}
                      onChange={(e) => handleChange(observation.id, "comment", e)}
                      fullWidth
                      />
                  </Grid>
                  </Grid>
                </form>
            ))
          }
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            height={"auto"}
            // style={{position: 'fixed'}}
          >
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <Button onClick={() => handleAddObservation()}>
                <AddCircleOutlineTwoToneIcon/> Nouvelle observation
              </Button>
            </Stack>
            
            <Stack justifyContent="flex-end">
              <Button variant="contained" onClick={() => saveandnext()}>
                <SaveIcon/> Save and Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
            
      </LayoutImageForm>
    </LayoutImageContainer>
  );
};
export default Annotation;
