import { Button, DialogTitle, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

const deployment_img = undefined;
const siteList = [1, 2, 3] //TO DO: get all sites
const deviceList = [1, 2, 3] //TO DO: get all available devices
const supportList = ["Support type 1", "Support type 2"]
const featureList = ["Caractéristique A", "Caractéristique B", "Caractéristique C"]
const baitList = ["Appât u", "Appât v", "Appât w", "Appât x", "Appât y", "Appât z"]

const DeploymentForm = (
    {isNewDeployment=false}
) => {

    const {currentProject, setCurrentProject, tmpDeploymentData, setTmpDeploymentData, currentDeployment, setCurrentDeployment, deploymentData} = useMainContext();

    let params = useParams();
    useEffect(() => {
        (async () => {
            setCurrentProject(Number(params.projectId));
            setCurrentDeployment(Number(params.deploymentId));
        })();
    }, []);

    useEffect(() => {
        (async () => {
            console.log("deploymentData");
            console.log(deploymentData);
            // if(deploymentData) {
            //     console.log('ici');
            //     setTmpDeploymentData(deploymentData);
            // }
            // else {
            //     console.log('la');
            //     setTmpDeploymentData({...tmpDeploymentData, project_id: currentProject});
            // };
            console.log("tmpDeploymentData");
            console.log(tmpDeploymentData);
        })();
    }, []);

    const handleFormChange = (
        params:string,  
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let updated_deployment_data = {...tmpDeploymentData};
        updated_deployment_data[params] = e.target.value;
        setTmpDeploymentData(updated_deployment_data);
        console.log(tmpDeploymentData);
    };

    const [isEditable, setIsEditable] = useState(false);
    const handleEdit = () => {
        if(isEditable) {
            setIsEditable(false); 
            tmpDeploymentData(deploymentData);
        } 
        else setIsEditable(true);
    };
    const handleSave = () => {
        console.log("save click");
        console.log(tmpDeploymentData);
        // DeploymentsService.
        // createDeploymentDeploymentsPost(currentDeploymentData);
        isEditable ? setIsEditable(false) : setIsEditable(true);
    };

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

    const [startDateValue, setStartDateValue] = useState<Date | null>(
        new Date(),
    );
    const [endDateValue, setEndDateValue] = useState<Date | null>(
        new Date(),
    );
    
    const handleDateChange = (params:string, newValue: Date | null) => {
        let updated_deployment_data = {...tmpDeploymentData};
        newValue !== null && (updated_deployment_data[params] = newValue.toISOString().slice(0, 10));
        setTmpDeploymentData(updated_deployment_data);
    };

    return(
        <form>
            <Stack
                direction="column"
                spacing={5}
            >   
                {
                    !isNewDeployment &&
                    <Typography variant="h4">
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
                        {(isNewDeployment || isEditable) &&
                            <Grid item  xs={12} sm={12} md={8} lg={8}>
                                <TextField 
                                    id="name"
                                    name="name"
                                    label="Nom du déploiement"
                                    value={tmpDeploymentData?.name}
                                    onChange={(e) => handleFormChange("name", e)}
                                    size="small"
                                    variant="filled"
                                    fullWidth 
                                />
                            </Grid>
                        }
                        
                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="site_id"
                                name="site_id"
                                label="Site d'étude"
                                value={tmpDeploymentData?.site_id}
                                onChange={(e) => handleFormChange("site_id", e)}
                                select 
                                variant="filled"
                                // type="search"
                                size="small"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
                            >
                                {siteList.map((siteOption) => (
                                    <MenuItem key={siteOption} value={siteOption}>
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
                                value={tmpDeploymentData?.device_id}
                                onChange={(e) => handleFormChange("device_id", e)}
                                select 
                                variant="filled"
                                type="search"
                                size="small"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
                            >
                                {deviceList.map((deviceOption) => (
                                    <MenuItem key={deviceOption} value={deviceOption}>
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
                                    style={{backgroundColor: "#BCAAA4"}}
                                    size="small"
                                >
                                    Ajouter un site
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date de début"
                                    inputFormat="dd/MM/yyyy"
                                    value={tmpDeploymentData?.start_date}
                                    onChange={(date) => handleDateChange("start_date", date)}
                                    renderInput={(params) => <TextField size="small" variant="filled" {...params} />}
                                    disabled={!isNewDeployment && !isEditable}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date de fin"
                                    inputFormat="dd/MM/yyyy"
                                    value={tmpDeploymentData?.end_date}
                                    onChange={(date) => handleDateChange("end_date", date)}
                                    renderInput={(params) => <TextField size="small" variant="filled" {...params} />}
                                    disabled={!isNewDeployment && !isEditable}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="support"
                                name="support"
                                label="Support d'accroche"
                                select
                                // value={currentDeploymentData?.support}
                                // onChange={(e) => handleFormChange("support", e)}
                                variant="filled"
                                size="small"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
                            >
                                {supportList.map((supportOption) => (
                                    <MenuItem key={supportOption} value={supportOption}>
                                        {supportOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="feature"
                                name="feature"
                                label="Caractéristique"
                                select
                                value={tmpDeploymentData?.feature}
                                onChange={(e) => handleFormChange("feature", e)}
                                variant="filled"
                                size="small"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
                            >
                                {featureList.map((featureOption) => (
                                    <MenuItem key={featureOption} value={featureOption}>
                                        {featureOption}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <OutlinedInput
                                label="Hauteur du dispositif"
                                // value={currentDeploymentData?.height}
                                // onChange={handleChange()}
                                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                inputProps={{
                                    step: 0.1,
                                    min: 0,
                                    type: 'number',
                                    "aria-label": "Hauteur du dispositif",
                                    variant: "filled"
                                }}
                                size="small"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
                            />
                        </Grid>

                        <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="bait"
                                name="bait"
                                label="Appât"
                                select
                                value={tmpDeploymentData?.bait}
                                onChange={(e) => handleFormChange("bait", e)}
                                size="small"
                                variant="filled"
                                fullWidth
                                disabled={!isNewDeployment && !isEditable}
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
                    direction={isNewDeployment?"column":"row"}
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item  xs={12} sm={12} md={isNewDeployment?12:6} lg={isNewDeployment?12:6}>
                        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
                            <DialogTitle variant="subtitle2">
                                <TurnedInNotTwoToneIcon style={{verticalAlign:"middle"}}/>
                                Exemple de titre ?
                            </DialogTitle>

                            <Grid container spacing={3}>
                                <Grid item  xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        onChange={handleAutomaticChange}
                                        label="Automatique" 
                                        disabled={!isNewDeployment && !isEditable}
                                    />
                                </Grid>

                                <Grid item  xs={12} sm={12} md={12} lg={12}>
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
                                        disabled={(!isNewDeployment && !isEditable) || !automatic}
                                    />
                                </Grid>

                                <Grid item  xs={12} sm={12} md={12} lg={12}>
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
                                        disabled={(!isNewDeployment && !isEditable) || !automatic}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item  xs={12} sm={12} md={isNewDeployment?12:6} lg={isNewDeployment?12:6}>
                        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
                            <DialogTitle variant="subtitle2">
                                <TurnedInNotTwoToneIcon style={{verticalAlign:"middle"}}/>
                                Paramétrage du dispositif
                            </DialogTitle>

                            <Grid container spacing={3}>
                            
                                <Grid item  xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch />} 
                                        onChange={handleTriggerChange}
                                        label="Déclenchement" 
                                        disabled={!isNewDeployment && !isEditable}
                                    />
                                </Grid>
                                <Grid item  xs={12} sm={12} md={6} lg={6}>
                                    <TextField 
                                        label="Nombre d'image par séquence"
                                        value={triggerNumber}
                                        onChange={handleTriggerNumberChange}
                                        inputProps={{
                                            step: 1,
                                            min: 1,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!isNewDeployment && !isEditable) || !trigger}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        label="Mode"
                                        // select
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!isNewDeployment && !isEditable) || !trigger}
                                    />
                                </Grid>
                                <Grid item  xs={12} sm={12} md={6} lg={6}>
                                    <TextField 
                                        label="Fréquence"
                                        value={triggerFreq}
                                        onChange={handleTriggerFreqChange}
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
                                        disabled={(!isNewDeployment && !isEditable) || !trigger}
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
                        value={tmpDeploymentData?.description}
                        onChange={(e) => handleFormChange("description", e)}
                        variant="filled"
                        multiline
                        rows={3}
                        fullWidth
                        disabled={!isNewDeployment && !isEditable}
                    />
                </Paper>
                
                {!isNewDeployment &&
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
                            style={{backgroundColor: "#2FA37C"}}
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
                            style={{backgroundColor: "#BCAAA4"}}
                        >
                            <SaveIcon />
                            Sauvegarder
                        </Button>
                    </Stack>
                }
            </Stack>
        </form>
    )
};
export default DeploymentForm;