import { Autocomplete, capitalize, Grid, IconButton, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAnnotationContext } from "../../contexts/annotationContext";
import { Annotation } from "../../client/models/Annotation";


const sep = " - ";

interface TaxonomicInputProps {
    rank: string;
    observation: Annotation;
};

const TaxonomicInput: FC<TaxonomicInputProps> = (
    props
) => {
    const { t } = useTranslation();

    const { handleFormChange } = useAnnotationContext();
    
    const [load, setLoad] = useState<boolean>(false);
    const [taxonList, setTaxonList] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");
    
    async function getData (search_name: string) {
        let data:string[]=[];
    
        if (props.rank === "species") {
            const speciesByLatinName = (await axios.get(`/taxapi/V1/taxons?RANG=ES&LB_NOM=${search_name}`)).data;
            const speciesByVernName = (await axios.get(`/taxapi/V1/taxons?RANG=ES&NOM_VERN=${search_name}`)).data;
            data = Array.from(new Set(speciesByLatinName.concat(speciesByVernName)));
        };
        if (props.rank === "genus") {
            data = (await axios.get(`/taxapi/V1/taxons?RANG=GN&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "family") {
            data = (await axios.get(`/taxapi/V1/taxons?RANG=FM&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "order") {
            data = (await axios.get(`/taxapi/V1/taxons?RANG=OR&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "classe") {
            data = (await axios.get(`/taxapi/V1/taxons?RANG=CL&LB_NOM=${search_name}`)).data;
        };

        setTaxonList(data);
        setLoad(false);
    };

    const onInputChange = (newInput) => {
        setInput(newInput);

        if (newInput.length >= 3) {
            setLoad(true);
            getData(newInput);
        };
    };

    async function reset() {
        let id: string = "";

        if (props.rank === "species") {
            id = (
                await axios
                .get(`/taxapi/V1/taxons?RANG=GN&LB_NOM=${ props.observation.genus }`)
            ).data[0].CD_NOM;
            handleFormChange(props.observation.id, "species", "");
        };
        if (props.rank === "genus") {
            id = (
                await axios
                .get(`/taxapi/V1/taxons?RANG=FM&LB_NOM=${ props.observation.family }`)
            ).data[0].CD_NOM;
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        if (props.rank === "family") {
            id = (
                await axios
                .get(`/taxapi/V1/taxons?RANG=OR&LB_NOM=${ props.observation.order }`)
            ).data[0].CD_NOM;
            handleFormChange(props.observation.id, "family", "");
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        if (props.rank === "order") {
            id = (
                await axios
                .get(`/taxapi/V1/taxons?RANG=CL&LB_NOM=${ props.observation.classe }`)
            ).data[0].CD_NOM;
            handleFormChange(props.observation.id, "order", "");
            handleFormChange(props.observation.id, "family", "");
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        if (props.rank === "classe") {
            handleFormChange(props.observation.id, "classe", "");
            handleFormChange(props.observation.id, "order", "");
            handleFormChange(props.observation.id, "family", "");
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
            handleFormChange(props.observation.id, "number", 0);
        };
        handleFormChange(props.observation.id, "id_annotation", id);
        setTaxonList([]);
    };

    async function onChange (newValue) {
        if (newValue.RANG === "ES") {
            handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            handleFormChange(props.observation.id, "order", newValue.ORDRE);
            handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            handleFormChange(props.observation.id, "genus", newValue.LB_NOM.split(' ')[0]);
            handleFormChange(props.observation.id, "species", newValue.LB_NOM);
        };
        if (newValue.RANG === "GN") {
            handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            handleFormChange(props.observation.id, "order", newValue.ORDRE);
            handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            handleFormChange(props.observation.id, "genus", newValue.LB_NOM.split(' ')[0]);
            handleFormChange(props.observation.id, "species", "");
        };
        if (newValue.RANG === "FM") {
            handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            handleFormChange(props.observation.id, "order", newValue.ORDRE);
            handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        if (newValue.RANG === "OR") {
            handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            handleFormChange(props.observation.id, "order", newValue.ORDRE);
            handleFormChange(props.observation.id, "family", "");
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        if (newValue.RANG === "CL") {
            handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            handleFormChange(props.observation.id, "order", "");
            handleFormChange(props.observation.id, "family", "");
            handleFormChange(props.observation.id, "genus", "");
            handleFormChange(props.observation.id, "species", "");
        };
        handleFormChange(props.observation.id, "id_annotation", newValue.CD_NOM);
        setTaxonList([]);
    };

    return(
        <Grid item lg={6} xs={12}>
            <Autocomplete
                id={ props.rank }
                freeSolo
                disableClearable
                loading={ load }
                value={ 
                    props.observation[props.rank] == undefined 
                    ? " " 
                    : props.observation[props.rank] 
                }
                onChange={(_, newValue) => {
                    onChange(newValue);
                }}
                inputValue={ input }
                onInputChange={ (_, newInput) => {
                    onInputChange(newInput);
                }}
                getOptionLabel={ (opt) => 
                    (typeof(opt) === "string") ? 
                    opt : 
                        (opt.NOM_VERN) ?
                        `${opt.CD_NOM}${sep}${opt.LB_NOM} (${opt.NOM_VERN})`:
                        `${opt.CD_NOM}${sep}${opt.LB_NOM}`
                }
                options={ taxonList }
                noOptionsText="Pas d'options"
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label={ capitalize(t(`taxon.${props.rank}`)) } 
                        size="small" 
                        variant="filled"
                        InputProps={{
                            ...params.InputProps, 
                            endAdornment: 
                            props.observation[props.rank] &&
                            <IconButton
                                onClick={ () => { reset() }}
                            >
                                <HighlightOffIcon fontSize="small"/>
                            </IconButton>
                        }}
                    />
                )}
            />
        </Grid>
    )
};

export default TaxonomicInput;