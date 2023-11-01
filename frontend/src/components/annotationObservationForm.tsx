import { Autocomplete, createFilterOptions, Grid, IconButton, MenuItem, Stack, TextField, Typography, capitalize } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import NestedList from "./common/collapsableButton";
import { useCallback, useEffect, useState } from "react";
import { request as __request } from '../client/core/request';
import axios from 'axios';
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";

// TODO: retrieve from database
const sexList = ["", "Mâle", "Femelle", "Indéterminé"];
const behaviourList = ["", "Comportement A", "Comportement B", "Comportement C"];
const lifeStageList = ["", "Oeuf", "Juvénile", "Adulte"];
const biologicalStateList = [" ", "Vivant", "Mort"];
const orderList = ["", "Cetartiodactyla"]
const familyList = ["", "Cervidae"]
const genusList = ["", "Capreolus"]
const classList = ["", "Mammalia"]

async function getData (search_name: string) {
    const promise = axios.get(`https://geonature.demos.natural-solutions.eu/taxhub/api/taxref/allnamebylist?search_name=${search_name}`)
    const speciesListe = (await promise).data
    return speciesListe
}

async function getDataFromCdNom (cd_nom: number) {
    const promise = axios.get(`https://geonature.demos.natural-solutions.eu/taxhub/api/taxref/?cd_nom=${cd_nom}&is_inbibtaxons=false&is_ref=false&limit=25&order=asc&orderby=nom_complet&page=1`)
    const test = (await promise).data
    const species = (await test).items
}
  interface SpeciesOptionType {
        gid: number;
        cd_nom: number;
        search_name: string;
        cd_ref: number;
        nom_valide: string;
        lb_nom: string;
        nom_vern: string;
        regne: string;
        group2_inpn: string;
      }


const AnnotationObservationForm = (
    props
) => {
    const { t } = useTranslation()
    const [especeOptions, setEspeceOptions] = useState<SpeciesOptionType[]>([]);
    const [especeInputValue, setEspeceInputValue] = useState<string>('');

    const getOptionsDelayed = useCallback(
        debounce((especeInputValue, callback) => {
            console.log('getting')
            console.log(especeInputValue)
            setEspeceOptions([]);
            getData(especeInputValue).then(callback);
        }, 200),
        []
    );
    
    useEffect(() => {
        if (especeInputValue.length >= 3) {
            getOptionsDelayed(especeInputValue, (filteredOptions) => {
                setEspeceOptions(filteredOptions);
            })
    }
    }, [especeInputValue, getOptionsDelayed]);

    return (
        
        <form key={props.observation.id}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography component={"span"} variant="h6">
                    { `Observation ${ props.index }` }
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
                        label={capitalize(t("species.class"))}
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
                        label={capitalize(t("species.order"))}
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
                        label={capitalize(t("species.family"))}
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
                        label={capitalize(t("species.genus"))}
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
                    <Autocomplete
                        id="espece"
                        freeSolo
                        disableClearable
                        loading={true}
                        value={props.observation.specie == undefined ? " " : props.observation.specie}
                        onChange={(event: any, newValue, params) => {
                        props.handleFormChange(props.observation.id, "specie", event);
                    }}
                        onInputChange={(e, newInputValue) => {setEspeceInputValue(newInputValue)}}
                        inputValue={especeInputValue}
                        getOptionLabel={(opt) => (typeof(opt) === "string") ? opt : `${opt.cd_nom} - ${opt.nom_vern} - ${opt.nom_valide}`}
                        options={especeOptions}
                        noOptionsText="Pas d'options"
                        renderInput={(params) => (
                            <TextField {...params} label={capitalize(t("species.species"))} size="small" variant='filled'
                                InputProps={{...params.InputProps, type: 'search'}}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <TextField
                        name="number"
                        label={capitalize(t("species.number"))}
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
                            label={capitalize(t("species.bio_state"))}
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
                            label={capitalize(t("species.sex"))}
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
                            label={capitalize(t("species.behaviour"))}
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
                            label={capitalize(t("species.life_stage"))}
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
                            label={capitalize(t("main.comment"))}
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
    )
};
export default AnnotationObservationForm;