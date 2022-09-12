import { Button, DialogTitle, Divider, FilledInput, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TurnedInNotTwoToneIcon from '@mui/icons-material/TurnedInNotTwoTone';import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMainContext } from "../contexts/mainContext";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Deployments, DeploymentsService } from "../client";

const deployment_img = undefined;
const siteList = [1, 2, 3] //TO DO: get all sites
const deviceList = [1, 2, 3] //TO DO: get all available devices
const supportList = ["Support type 1", "Support type 2"]
const featureList = ["fruitin tree", "Caractéristique A", "Caractéristique B", "Caractéristique C"]
const baitList = ["aurélie", "Appât u", "Appât v", "Appât w", "Appât x", "Appât y", "Appât z"]

const DeploymentForm = (
    props
) => {

    const {setCurrentProject, setCurrentDeployment, deploymentData, setDeploymentData, updateProjectSheetData} = useMainContext();
    let params = useParams();
    const [tmpDeploymentData, setTmpDeploymentData] = useState<Deployments>({name:'', bait:'', feature: '', site_id: 0, device_id: 0, project_id: Number(params.projectId), description: ''});

    useEffect(() => {
        setCurrentProject(Number(params.projectId));
        setCurrentDeployment(Number(params.deploymentId));
    });
    
    useEffect(() => {
        !props.isNewDeployment &&
            setTmpDeploymentData(deploymentData);
    }, [deploymentData]);

    const handleFormChange = (
        params:string,  
        e: ChangeEvent< HTMLInputElement| HTMLTextAreaElement >
    ) => {
        let updated_deployment_data = {...tmpDeploymentData};
        updated_deployment_data[params] = e.target.value;
        setTmpDeploymentData(updated_deployment_data);
    };

    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        if(isEditable) {
            setIsEditable(false); 
            setTmpDeploymentData(deploymentData);
        } 
        else setIsEditable(true);
    };
    const handleSave = () => {

        if (props.isNewDeployment) {
            // POST
            DeploymentsService
            .createDeploymentDeploymentsPost(tmpDeploymentData)
            .then(() => {
                updateProjectSheetData();
                props.handleCloseNewDeployment();
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            // PUT
            DeploymentsService.
            updateDeploymentDeploymentsDeploymentIdPut(deploymentData.id, tmpDeploymentData);
            setDeploymentData(tmpDeploymentData);
            setCurrentDeployment(Number(params.deploymentId));
            isEditable ? setIsEditable(false) : setIsEditable(true);
        }
    };

    const handleDateChange =(params,  d) => {
        let updated_deployment_data = {...tmpDeploymentData};
        updated_deployment_data[params] = d;
        setTmpDeploymentData(updated_deployment_data);
    };

    // To update when database will be fixed
    const [automatic, setAutomatic] = useState(false);
    const handleAutomaticChange = () => {
        setAutomatic(!automatic);
    };
    
    const [autoNumber, setAutoNumber] = useState<null | Number>(null);
    const handleAutoNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoNumber(Number(event.target.value));
    };
    
    const [autoFreq, setAutoFreq] = useState<null | Number>(null);
    const handleAutoFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoFreq(Number(event.target.value));
    };
    
    const [trigger, setTrigger] = useState(false);
    const handleTriggerChange = () => {
        setTrigger(!trigger);
    };
    
    const [triggerNumber, setTriggerNumber] = useState<null | Number>(null);
    const handleTriggerNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriggerNumber(Number(event.target.value));
    };
    
    const [triggerFreq, setTriggerFreq] = useState<null | Number>(null);
    const handleTriggerFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriggerFreq(Number(event.target.value));
    };

    return(
        <form>
            <Stack
                direction="column"
                spacing={5}
            >   
                {
                    !props.isNewDeployment &&
                    <Typography component={'span'} variant="h4">
                        {deploymentData?.name}
                    </Typography>
                }
                
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                >
                {/* Si image du deploiement, la mettre sinon mettre zone drag&drop pour l'image */}
                    <Grid 
                        item
                        lg={5}
                        height={200}
                        style={{backgroundColor: "#afbdb6"}}
                    >
                        {
                            deployment_img ?
                            <img></img> : 
                            <Dropzone 
                                // onDrop={loadFile} 
                                maxFiles={1}
                                // style={{"height": "100%"}}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section id="dropzone">
                                        <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                            Ajouter une photo du déploiement
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        }
                    </Grid>

                    <Grid 
                        item
                        lg={5}
                        style={{backgroundColor: "#98d4b7"}}
                        height={200}
                    >
                        Map
                    </Grid>
                </Stack>

                <Paper elevation={0} sx={{ px: 2, py: 2 }}>
                    <DialogTitle variant="subtitle2">
                        <TurnedInNotTwoToneIcon style={{verticalAlign:"middle"}}/>
                        Caractéristiques générales du déploiement
                    </DialogTitle>

                    <Grid container spacing={2}>
                        {(props.isNewDeployment || isEditable) &&
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <TextField 
                                    id="name"
                                    name="name"
                                    label="Nom du déploiement"
                                    required
                                    defaultValue={deploymentData?.name}
                                    onChange={(e) => handleFormChange("name", e)}
                                    size="small"
                                    variant="filled"
                                    fullWidth
                                    error={tmpDeploymentData?.name === ""}
                                    helperText={tmpDeploymentData?.name === "" &&"Champs requis"}
                                />
                            </Grid>
                        }
                        
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="site_id"
                                name="site_id"
                                label="Site d'étude"
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.site_id?.toString()}
                                onChange={(e) => handleFormChange("site_id", e)}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {siteList.map((siteOption) => (
                                    <MenuItem 
                                        key={siteOption} 
                                        value={siteOption}>
                                        {siteOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="device_id"
                                name="device_id"
                                label="Dispositif"
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.device_id?.toString()}
                                onChange={(e) => handleFormChange("device_id", e)}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {deviceList.map((deviceOption) => (
                                    <MenuItem 
                                        key={deviceOption} 
                                        value={deviceOption}>
                                        {deviceOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid 
                            item
                            xs={12} sm={12} md={12} lg={12}
                        >
                            <Grid 
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Button 
                                    variant="contained" 
                                    startIcon={<AddCircleIcon />} 
                                    color="secondary"
                                    size="small"
                                >
                                    Ajouter un site
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date de début"
                                    inputFormat="dd/MM/yyyy"
                                    value={tmpDeploymentData?.start_date || null}
                                    onChange={(date) => handleDateChange("start_date", date)}
                                    renderInput={(params) => <TextField size="small" variant="filled" {...params} />}
                                    disabled={!props.isNewDeployment && !isEditable}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date de fin"
                                    inputFormat="dd/MM/yyyy"
                                    value={tmpDeploymentData?.end_date || null}
                                    onChange={(date) => handleDateChange("end_date", date)}
                                    renderInput={(params) => <TextField size="small" variant="filled" {...params} />}
                                    disabled={!props.isNewDeployment && !isEditable}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="support"
                                name="support"
                                label="Support d'accroche"
                                defaultValue=""
                                select
                                // value={tmpDeploymentData?.support}
                                // onChange={(e) => handleFormChange("support", e)}
                                variant="filled"
                                size="small"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {supportList.map((supportOption) => (
                                    <MenuItem key={supportOption} value={supportOption}>
                                        {supportOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="feature"
                                name="feature"
                                label="Caractéristique"
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.feature}
                                onChange={(e) => handleFormChange("feature", e)}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {featureList.map((featureOption) => (
                                    <MenuItem key={featureOption} value={featureOption}>
                                        {featureOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id="height"
                                label="Hauteur du dispositif"
                                name="height"
                                // value={currentDeploymentData?.height}
                                // onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">cm</InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    type: "number",
                                    step: "0.1",
                                    min: "0"}}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="bait"
                                name="bait"
                                label="Appât"
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.bait}
                                onChange={(e) => handleFormChange("bait", e)}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {baitList.map((baitOption) => (
                                    <MenuItem 
                                        key={baitOption} 
                                        value={baitOption}>
                                        {baitOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                    </Grid>
                </Paper>
                
                <Stack
                    direction={props.isNewDeployment?"column":"row"}
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item xs={12} sm={12} md={props.isNewDeployment?12:6} lg={props.isNewDeployment?12:6}>
                        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
                            <DialogTitle variant="subtitle2">
                                <TurnedInNotTwoToneIcon style={{verticalAlign:"middle"}}/>
                                Exemple de titre ?
                            </DialogTitle>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        onChange={handleAutomaticChange}
                                        label="Automatique" 
                                        disabled={!props.isNewDeployment && !isEditable}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label="Nombre d'image par séquence" 
                                        value={autoNumber}
                                        onChange={handleAutoNumberChange}
                                        inputProps={{
                                            step: 1,
                                            min: 1,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !automatic}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label="Fréquence" 
                                        value={autoFreq}
                                        onChange={handleAutoFreqChange}
                                        inputProps={{
                                            step: 0.05,
                                            min: 0.05,
                                            max: 1,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !automatic}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={props.isNewDeployment?12:6} lg={props.isNewDeployment?12:6}>
                        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
                            <DialogTitle variant="subtitle2">
                                <TurnedInNotTwoToneIcon style={{verticalAlign:"middle"}}/>
                                Paramétrage du dispositif
                            </DialogTitle>

                            <Grid container spacing={3}>
                            
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        onChange={handleTriggerChange}
                                        label="Déclenchement" 
                                        disabled={!props.isNewDeployment && !isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField 
                                        label="Nombre d'image par séquence"
                                        value={triggerNumber}
                                        onChange={handleTriggerNumberChange}
                                        inputProps={{
                                            step: 1,
                                            min: 1,
                                            type: 'number'
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !trigger}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        label="Mode"
                                        // select
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !trigger}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField 
                                        label="Fréquence"
                                        value={triggerFreq}
                                        onChange={handleTriggerFreqChange}
                                        inputProps={{
                                            step: 0.05,
                                            min: 0.05,
                                            max: 1,
                                            type: 'number'
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !trigger}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Stack>

                <Paper elevation={0}>
                    <TextField 
                        id="description"
                        name="description"
                        label="Description"
                        defaultValue=""
                        value={tmpDeploymentData?.description}
                        onChange={(e) => handleFormChange("description", e)}
                        variant="filled"
                        multiline
                        rows={4}
                        fullWidth
                        disabled={!props.isNewDeployment && !isEditable}
                    />
                </Paper>
                
                {!props.isNewDeployment ? 
                    (
                        <Stack 
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button
                                onClick={handleEdit}
                                size="small" 
                                variant="contained" 
                                color="secondary"
                            >
                                {
                                    isEditable ? 
                                    <><CancelIcon /> Annuler</> : 
                                    <><EditIcon /> Modifier</>
                                }
                            </Button>
                            <Button 
                                onClick={handleSave}
                                disabled={!isEditable}
                                size="small" 
                                variant="contained" 
                                color="primary"
                            >
                                <SaveIcon />
                                Sauvegarder
                            </Button>
                        </Stack>
                    ) : (
                        <Stack justifyContent="flex-end" direction="row">
                            <Button 
                                onClick={handleSave} 
                                color="primary"
                                variant="contained"
                            >
                                Enregistrer
                            </Button>
                        </Stack>
                    )
                }
            </Stack>
        </form>
    )
};
export default DeploymentForm;