import { Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import NestedList from "./common/collapsableButton";


// TODO: retrieve from database
const sexList = ["", "Mâle", "Femelle", "Indéterminé"];
const behaviourList = ["", "Comportement A", "Comportement B", "Comportement C"];
const lifeStageList = ["", "Oeuf", "Juvénile", "Adulte"];
const biologicalStateList = [" ", "Vivant", "Mort"];
const orderList = ["", "Cetartiodactyla"]
const familyList = ["", "Cervidae"]
const genusList = ["", "Capreolus"]
const classList = ["", "Mammalia"]
const speciesList = ["", "Capreolus capreolus", "Cerf axis"]

const AnnotationObservationForm = (
    props
) => {
    return (
        <div>
            <form key={props.observation.id}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Typography component={"span"} variant="h6">
                        {`Observation ${props.observation.id}`}
                    </Typography>

                    <IconButton
                        onClick={() => props.handleDeleteObservation(props.observation.id)} >
                        <ClearTwoToneIcon />
                    </IconButton>
                </Stack>
                <Grid container spacing={1}>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            name="classe"
                            label="Classe"
                            size="small"
                            variant='filled'
                            fullWidth
                            select
                            value={props.observation.classe == undefined ? " " : props.observation.classe}
                            onChange={
                                (e) => props.handleFormChange(props.observation.id, "classe", e)
                            }
                        >
                            {classList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            name="order"
                            label="Ordre"
                            size="small"
                            variant='filled'
                            fullWidth
                            select
                            value={props.observation.order == undefined ? " " : props.observation.order}
                            onChange={
                                (e) => props.handleFormChange(props.observation.id, "order", e)
                            }
                        >
                            {orderList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            name="family"
                            label="Famille"
                            size="small"
                            variant='filled'
                            fullWidth
                            select
                            value={props.observation.family == undefined ? " " : props.observation.family}
                            onChange={
                                (e) => props.handleFormChange(props.observation.id, "family", e)
                            }
                        >
                            {familyList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            name="genus"
                            label="Genre"
                            size="small"
                            variant='filled'
                            fullWidth
                            select
                            value={props.observation.genus == undefined ? " " : props.observation.genus}
                            onChange={
                                (e) => props.handleFormChange(props.observation.id, "genus", e)
                            }
                        >
                            {genusList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            name="species"
                            label="Espèce"
                            size="small"
                            variant='filled'
                            fullWidth
                            select
                            value={props.observation.specie == undefined ? " " : props.observation.specie}
                            onChange={
                                (e) => props.handleFormChange(props.observation.id, "specie", e)
                            }
                        >
                            {speciesList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item lg={6} xs={12}>
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
                </Grid>
                <NestedList>
                    <Grid container spacing={1}>
                        <Grid item lg={6} xs={12}>
                            <TextField
                                id="biologicalState"
                                select
                                label="Etat biologique"
                                size="small"
                                variant='filled'
                                value={props.observation.biological_state}
                                onChange={
                                    (e) => props.handleFormChange(props.observation.id, "biological_state", e)
                                }
                                fullWidth
                            >
                                {biologicalStateList.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item lg={6} xs={12}>
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
                        <Grid item lg={6} xs={12}>
                            <TextField
                                id="behaviour"
                                select
                                label="Comportement"
                                size="small"
                                variant='filled'
                                value={props.observation.behaviour}
                                onChange={(e) => props.handleFormChange(props.observation.id, "behaviour", e)}
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
                        <Grid item lg={6} xs={12}>
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

                        <Grid item lg={12} xs={12}>
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
                </NestedList>
            </form>
        </div>
    )
};
export default AnnotationObservationForm;