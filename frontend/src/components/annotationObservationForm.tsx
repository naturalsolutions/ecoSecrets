import { Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

// TODO: retrieve from database
const sexList = ["Mâle", "Femelle", "Indéterminé"];
const behaviourList = ["Comportement A", "Comportement B", "Comportement C"];
const lifeStageList = ["Oeuf", "Juvénile", "Adulte"];
const biologicalStateList = ["Vivant", "Mort"];

const AnnotationObservationForm = (
    props
) => {
    return(
        <form key={props.observation.id}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography variant="h6">
                    {`Observation ${props.observation.id}`}
                </Typography>
                
                <IconButton 
                    onClick = {() => props.handleDeleteObservation(props.observation.id)} >
                  <ClearTwoToneIcon/>
                </IconButton>
            </Stack>

            <Grid container spacing={1}>
                <Grid item lg={6}>
                    <TextField
                        name="species"
                        label="Espèce"
                        size="small"
                        variant='filled'
                        fullWidth
                        value={props.observation.specie}
                        onChange={
                            (e) => props.handleFormChange(props.observation.id, "specie", e)
                        }
                    />
                </Grid>

                <Grid item lg={6}>
                    <TextField
                        name="number"
                        label="Nombre d'individus"
                        size="small"
                        variant='filled'
                        inputProps={{ type: 'number' }}
                        value={props.observation.number}
                        onChange={
                            (e) => props.handleFormChange(props.observation.id, "number", e)
                        }
                        fullWidth
                    />
                </Grid>

                <Grid item lg={6}>
                    <TextField
                        id="sex"
                        select
                        label="Sexe"
                        variant='filled'
                        value={props.observation.sex}
                        onChange={(e) => props.handleFormChange(props.observation.id, "sex", e)}
                        size="small"
                        fullWidth
                    >
                        {sexList.map((item) => (
                            <MenuItem 
                                key={item} 
                                value={item}
                            >
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
                        variant='filled'
                        value={props.observation.behaviour}
                        onChange = {(e) => props.handleFormChange(props.observation.id, "behaviour",e)}
                        fullWidth
                    >
                        {behaviourList.map((item) => (
                            <MenuItem 
                                key={item} 
                                value={item}
                            >
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
                        variant='filled'
                        value={props.observation.life_stage}
                        onChange={
                            (e) => props.handleFormChange(props.observation.id, "life_stage", e)
                        }
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
                        variant='filled'
                        value={props.observation.biological_state}
                        onChange={
                            (e) => props.handleFormChange(props.observation.id,"biological_state", e)
                        }
                        fullWidth
                    >
                        { biologicalStateList.map((item) => (
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
                        variant='filled'
                        value={props.observation.comment}
                        onChange={(e) => props.handleFormChange(props.observation.id, "comment", e)}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </form>
    );
};
export default AnnotationObservationForm;