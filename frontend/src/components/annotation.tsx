import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, MenuItem, Stack, styled, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMainContext } from "../contexts/mainContext";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

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
  },
  // justifyContent: "center"
}));

const LayoutImageForm = styled("div")(({ theme }) => ({
  gridColumn: "8/13",
  [theme.breakpoints.down("md")]: {
    gridColumn: "1/13",
    gridRow: "5/9",
  },
  overflowY: "scroll",
}));

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

  const save = () => {
  };

  const saveandnext = () => {
    save();
    next();
  };

  const sexList = (): string[] => {
    return ["Mâle", "Femelle", "Indéterminé"]
  };

  const behaviourList = (): string[] => {
    return ["Comportement A", "Comportement B", "Comportement C"]
  };

  const lifeStageList = (): string[] => {
    return ["Oeuf", "Juvénile", "Adulte"]
  };

  const biologicalStateList = (): string[] => {
    return ["Vivant", "Mort"]
  };

  return (
    <LayoutImageContainer>
      <LayoutImageImage>{
        image() ? (
          <Box>
            <img
              src={`${image().url}`}
              alt={image().name}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: "block",
                width: "100%",
                position: "relative"
              }}
            />
            <IconButton  
              onClick={() => previous()} 
              style={{
                position: "absolute",
                top: '50%',
                left: '10%',
                color: "white",
                backgroundColor: "black",
                opacity: 0.5
              }}
            >
              <ArrowBackIosIcon/>
            </IconButton>

            <IconButton  
              onClick={() => next()}
              size="large"
              style={{
                position: "absolute",
                top: '50%',
                left: '58%',
                color: "white",
                backgroundColor: "black",
                opacity: 0.5
              }}
            >
              <ArrowForwardIosIcon/>
            </IconButton>
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
          <TextField
            name="species"
            label="Espèce"
          />
          <TextField
            name="number"
            label="Nombre d'individus"
            inputProps={{ type: 'number' }}
          />
          <TextField
            select
            label="Sexe"
          >
            {sexList().map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Comportement"
          >
            {behaviourList().map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Stade de vie"
          >
            {lifeStageList().map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Etat biologique"
          >
            {biologicalStateList().map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="comment"
            label="Commentaire"
          />
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              {/* <Button variant="contained" onClick={() => previous()}>
                PREVIOUS
              </Button>
              <Button variant="contained" onClick={() => next()}>
                NEXT
              </Button> */}
              <Button>
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
