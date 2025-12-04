import { FC, useState } from "react";
// import { Autocomplete, capitalize, Grid, IconButton, TextField } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import axios from 'axios';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import { useAnnotationContext } from "../../contexts/annotationContext";
// import { Annotation } from "../../client/models/Annotation";
// import { useFilesContext } from "../../contexts/filesContext";


// const sep = " - ";

// interface TaxonomicInputProps {
//     rank: string;
//     observation?: Annotation;
//     isFilter?: boolean;
//     reset?: boolean;
// };

// const TaxonomicInput: FC<TaxonomicInputProps> = (
//     props
// ) => {
//     const { t } = useTranslation();

//     const { handleFormChange } = useAnnotationContext();
//     const { filters, setFilters } = useFilesContext();
    
//     const [load, setLoad] = useState<boolean>(false);
//     const [taxonList, setTaxonList] = useState<string[]>([]);
//     const [input, setInput] = useState<string>("");
    
//     async function getData (search_name: string) {
//         let data:string[]=[];
    
//         if (props.rank === "species") {
//             const speciesByLatinName = (await axios.get(`/taxapi/V1/taxons?RANG=ES&LB_NOM=${search_name}`)).data;
//             const speciesByVernName = (await axios.get(`/taxapi/V1/taxons?RANG=ES&NOM_VERN=${search_name}`)).data;
//             data = Array.from(new Set(speciesByLatinName.concat(speciesByVernName)));
//         };
//         if (props.rank === "genus") {
//             data = (await axios.get(`/taxapi/V1/taxons?RANG=GN&LB_NOM=${search_name}`)).data;
//         };
//         if (props.rank === "family") {
//             data = (await axios.get(`/taxapi/V1/taxons?RANG=FM&LB_NOM=${search_name}`)).data;
//         };
//         if (props.rank === "order") {
//             data = (await axios.get(`/taxapi/V1/taxons?RANG=OR&LB_NOM=${search_name}`)).data;
//         };
//         if (props.rank === "classe") {
//             data = (await axios.get(`/taxapi/V1/taxons?RANG=CL&LB_NOM=${search_name}`)).data;
//         };

//         setTaxonList(data);
//         setLoad(false);
//     };

//     const onInputChange = (newInput) => {
//         setInput(newInput);

//         if (newInput.length >= 3) {
//             setLoad(true);
//             getData(newInput);
//         };
//     };

//     async function reset() {
//         if (props.isFilter) {
//             updateFilters(props.rank, "");
//             setTaxonList([]);
//         };

//         if (!props.isFilter) {
//             let id: string = "";
//             if (props.rank === "species") {
//                 id = (
//                     await axios
//                     .get(`/taxapi/V1/taxons?RANG=GN&LB_NOM=${ props.observation?.genus }`)
//                 ).data[0].CD_NOM;
//                 handleChange("species", "");
//             };
//             if (props.rank === "genus") {
//                 id = (
//                     await axios
//                     .get(`/taxapi/V1/taxons?RANG=FM&LB_NOM=${ props.observation?.family }`)
//                 ).data[0].CD_NOM;
//                 handleChange("genus", "");
//                 handleChange("species", "");
//             };
//             if (props.rank === "family") {
//                 id = (
//                     await axios
//                     .get(`/taxapi/V1/taxons?RANG=OR&LB_NOM=${ props.observation?.order }`)
//                 ).data[0].CD_NOM;
//                 handleChange("family", "");
//                 handleChange("genus", "");
//                 handleChange("species", "");
//             };
//             if (props.rank === "order") {
//                 id = (
//                     await axios
//                     .get(`/taxapi/V1/taxons?RANG=CL&LB_NOM=${ props.observation?.classe }`)
//                 ).data[0].CD_NOM;
//                 handleChange("order", "");
//                 handleChange("family", "");
//                 handleChange("genus", "");
//                 handleChange("species", "");
//             };
//             if (props.rank === "classe") {
//                 handleChange("classe", "");
//                 handleChange("order", "");
//                 handleChange("family", "");
//                 handleChange("genus", "");
//                 handleChange("species", "");
//                 handleChange("number", 0);
//             };
//             handleChange("id_annotation", id);
//             setTaxonList([]);
//         }
//     };

//     const updateFilters = (key: string, value: string) => {
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           [key]: value,
//         }));
//       };
    

//     async function handleChange(property, value) {
//         if (!props.isFilter) {
//             handleChange(property, value);
//         };
//         if (props.isFilter) {
//             updateFilters(property, value);
//         };
//     };

//     async function onChange (newValue) {
//         if (newValue.RANG === "ES") {
//             handleChange("classe", newValue.CLASSE);
//             handleChange("order", newValue.ORDRE);
//             handleChange("family", newValue.FAMILLE);
//             handleChange("genus", newValue.LB_NOM.split(' ')[0]);
//             handleChange("species", newValue.LB_NOM);
//         };
//         if (newValue.RANG === "GN") {
//             handleChange("classe", newValue.CLASSE);
//             handleChange("order", newValue.ORDRE);
//             handleChange("family", newValue.FAMILLE);
//             handleChange("genus", newValue.LB_NOM.split(' ')[0]);
//             handleChange("species", "");
//         };
//         if (newValue.RANG === "FM") {
//             handleChange("classe", newValue.CLASSE);
//             handleChange("order", newValue.ORDRE);
//             handleChange("family", newValue.FAMILLE);
//             handleChange("genus", "");
//             handleChange("species", "");
//         };
//         if (newValue.RANG === "OR") {
//             handleChange("classe", newValue.CLASSE);
//             handleChange("order", newValue.ORDRE);
//             handleChange("family", "");
//             handleChange("genus", "");
//             handleChange("species", "");
//         };
//         if (newValue.RANG === "CL") {
//             handleChange("classe", newValue.CLASSE);
//             handleChange("order", "");
//             handleChange("family", "");
//             handleChange("genus", "");
//             handleChange("species", "");
//         };
//         handleChange("id_annotation", newValue.CD_NOM);
//         setTaxonList([]);
//     };

//     return(
//         <Grid item xs={12} sm={6} md={2} lg={props.isFilter ? 1.7 : 6}>
//             <Autocomplete
//                 id={ props.rank }
//                 freeSolo
//                 disableClearable
//                 loading={ load }
//                 value={ 
//                     (props.observation && props.observation[props.rank]) || " "
//                 }
//                 onChange={(_, newValue) => {
//                     onChange(newValue);
//                 }}
//                 inputValue={ input }
//                 onInputChange={ (_, newInput) => {
//                     onInputChange(newInput);
//                 }}
//                 getOptionLabel={ (opt) => 
//                     (typeof(opt) === "string") ? 
//                     opt : 
//                         (opt.NOM_VERN) ?
//                         `${opt.CD_NOM}${sep}${opt.LB_NOM} (${opt.NOM_VERN})`:
//                         `${opt.CD_NOM}${sep}${opt.LB_NOM}`
//                 }
//                 options={ taxonList }
//                 noOptionsText="Pas d'options"
//                 renderInput={(params) => (
//                     <TextField
//                         {...params} 
//                         label={ capitalize(t(`taxon.${props.rank}`)) } 
//                         size="small" 
//                         variant={ props.isFilter ? "outlined" : "standard" } 
//                         InputProps={{
//                             ...params.InputProps, 
//                             endAdornment: 
//                             props.observation && props.observation[props.rank] &&
//                             <IconButton
//                                 onClick={ () => { reset() }}
//                             >
//                                 <HighlightOffIcon fontSize="small"/>
//                             </IconButton>
//                         }}
//                     />
//                 )}
//             />
//         </Grid>
//     )
// };

// export default TaxonomicInput;