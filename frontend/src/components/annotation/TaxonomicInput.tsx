import { Autocomplete, capitalize, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';


const sep = " - "

const TaxonomicInput = (
    props
) => {
    const { t } = useTranslation();
    const [load, setLoad] = useState<boolean>(false);
    const [taxonList, setTaxonList] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");
    
    async function getData (search_name: string) {
        let data:string[]=[];
    
        if (props.rank === "specie") {
            const speciesByLatinName = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=ES&LB_NOM=${search_name}`)).data;
            const speciesByVernName = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=ES&NOM_VERN=${search_name}`)).data;
            data = Array.from(new Set(speciesByLatinName.concat(speciesByVernName)));
        };
        if (props.rank === "genus") {
            data = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=GN&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "family") {
            data = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=FM&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "order") {
            data = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=OR&LB_NOM=${search_name}`)).data;
        };
        if (props.rank === "classe") {
            data = (await axios.get(`http://localhost:8889/taxapi/V1/taxons?RANG=CL&LB_NOM=${search_name}`)).data;
        };

        setTaxonList(data);
        setLoad(false);
    };

    const onInputChange = (newInput) => {
        setInput(newInput);
        
        if (newInput === "") {
            reset();
        };

        if (newInput.length >= 3) {
            setLoad(true);
            getData(newInput);
        };
    };

    

    async function reset () {

        if (props.rank === "specie") {
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (props.rank === "genus") {
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (props.rank === "family") {
            props.handleFormChange(props.observation.id, "family", "");
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (props.rank === "order") {
            props.handleFormChange(props.observation.id, "order", "");
            props.handleFormChange(props.observation.id, "family", "");
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (props.rank === "classe") {
            props.handleFormChange(props.observation.id, "classe", "");
            props.handleFormChange(props.observation.id, "order", "");
            props.handleFormChange(props.observation.id, "family", "");
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        setTaxonList([]);
    };

    async function onChange (newValue) {
        if (newValue.RANG === "ES") {
            props.handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            props.handleFormChange(props.observation.id, "order", newValue.ORDRE);
            props.handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            props.handleFormChange(props.observation.id, "genus", newValue.LB_NOM.split(' ')[0]);
            props.handleFormChange(props.observation.id, "specie", newValue.LB_NOM);
        };
        if (newValue.RANG === "GN") {
            props.handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            props.handleFormChange(props.observation.id, "order", newValue.ORDRE);
            props.handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            props.handleFormChange(props.observation.id, "genus", newValue.LB_NOM.split(' ')[0]);
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (newValue.RANG === "FM") {
            props.handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            props.handleFormChange(props.observation.id, "order", newValue.ORDRE);
            props.handleFormChange(props.observation.id, "family", newValue.FAMILLE);
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (newValue.RANG === "OR") {
            props.handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            props.handleFormChange(props.observation.id, "order", newValue.ORDRE);
            props.handleFormChange(props.observation.id, "family", "");
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
        if (newValue.RANG === "CL") {
            props.handleFormChange(props.observation.id, "classe", newValue.CLASSE);
            props.handleFormChange(props.observation.id, "order", "");
            props.handleFormChange(props.observation.id, "family", "");
            props.handleFormChange(props.observation.id, "genus", "");
            props.handleFormChange(props.observation.id, "specie", "");
        };
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
                            ...params.InputProps, type: "search"
                        }}
                    />
                )}
            />
        </Grid>
    )
};

export default TaxonomicInput;