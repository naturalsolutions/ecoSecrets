import { Button, DialogTitle, FormControlLabel, Grid, InputAdornment, MenuItem, Paper, Stack, Switch, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TurnedInNotTwoToneIcon from '@mui/icons-material/TurnedInNotTwoTone'; import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMainContext } from "../contexts/mainContext";
import { useParams } from "react-router-dom";
import { Deployments, DeploymentsService, DeploymentWithTemplateSequence, SequencesService, TemplateSequence } from "../client";
import DropzoneComponent from "./dropzoneComponent";
import { useTranslation } from "react-i18next";
import { capitalize } from "@mui/material";

const deployment_img = undefined;

const DeploymentForm = (
    props
) => {

    const {setCurrentProject, currentDeployment, setCurrentDeployment, deploymentData, setDeploymentData, updateProjectSheetData, sites, devices, autoTemplates, updateAutoTemplates, triggerTemplates, updateTriggerTemplates} = useMainContext();
    let params = useParams();
    const [tmpDeploymentData, setTmpDeploymentData] = useState<DeploymentWithTemplateSequence>({id: currentDeployment, name: '', support: '', height: undefined, bait: '', feature: '', site_id: 0, device_id: 0, project_id: Number(params.projectId), description: '', start_date:''});
    
    const supportList = ["Support type 1", "Support type 2"]
    const featureList = ["Arbre fruitier", "Caractéristique A", "Caractéristique B", "Caractéristique C"]
    const baitList = ["Appât u", "Appât v", "Appât w", "Appât x", "Appât y", "Appât z", "None"]

    const [siteName, setSiteName] = useState<string>('');
    const [deviceName, setDeviceName] = useState<string>('');
    const [isEditable, setIsEditable] = useState(false);

    const [automatic, setAutomatic] = useState({isAutomatic: false, imageNumber: undefined, frequency: undefined});
    const [trigger, setTrigger] = useState({isTrigger: false, imageNumber: undefined, frequency: undefined});

    const { t } = useTranslation();


    useEffect(() => {
        setCurrentProject(Number(params.projectId));
        setCurrentDeployment(Number(params.deploymentId));
    });
    
    useEffect(() => {
        if (!props.isNewDeployment) {
            setTmpDeploymentData(deploymentData);

            if (deploymentData && deploymentData.template_sequences?.length > 0) {
                let dataAutomatic = deploymentData.template_sequences.find((t) => t.mode == "automatic");
                dataAutomatic && setAutomatic({isAutomatic: true, frequency: dataAutomatic.frequency, imageNumber: dataAutomatic.number_images});

                let dataTrigger = deploymentData.template_sequences.find((t) => t.mode == "trigger")
                dataTrigger && setTrigger({isTrigger: true, frequency: dataTrigger.frequency, imageNumber: dataTrigger.number_images});
            };
        };

    }, [deploymentData]);

    useEffect(() => {
        let tmpSite = sites.find((s) => s.id === tmpDeploymentData?.site_id)?.name;
        setSiteName(tmpSite);
    }, [tmpDeploymentData?.site_id]);

    useEffect(() => {
        let tmpDevice = devices.find((d) => d.id === tmpDeploymentData?.device_id)?.name;
        setDeviceName(tmpDevice);
    }, [tmpDeploymentData?.device_id]);


    const handleFormChange = (
        params:string,  
        value: number|string
    ) => {
        let updated_deployment_data = { ...tmpDeploymentData };
        updated_deployment_data[params] = value;
        setTmpDeploymentData(updated_deployment_data);
    };

    const handleModeChange = async (
        automatic, 
        trigger
    ) => {
        
        let newSequenceTemplate : any[] = []

        let autoTemplate;
        let triggerTemplate;

        if(automatic.isAutomatic) {
            autoTemplate = autoTemplates.find((t) => 
            t.number_images == automatic.imageNumber && t.frequency == automatic.frequency);
            
            if (autoTemplate === undefined) {
                newSequenceTemplate.push({
                    mode: "automatic", 
                    number_images: automatic.imageNumber,
                    frequency: automatic.frequency
                });
            }
            if (autoTemplate) {
                newSequenceTemplate.push(autoTemplate);
            }
        };

        if(trigger.isTrigger) {
            triggerTemplate = triggerTemplates.find((t) => 
            t.number_images == trigger.imageNumber && t.frequency == trigger.frequency);
            
            if (triggerTemplate === undefined) {
                newSequenceTemplate.push({
                    mode: "trigger", 
                    number_images: trigger.imageNumber,
                    frequency: trigger.frequency
                });
            }
            if (triggerTemplate) {
                newSequenceTemplate.push(triggerTemplate);
            }
        };

        let updatedTmpDeploymentData = tmpDeploymentData;
        updatedTmpDeploymentData["template_sequences"] = newSequenceTemplate;
        setTmpDeploymentData(updatedTmpDeploymentData);
    };

    const handleEdit = () => {
        if(isEditable) {
            setIsEditable(false); 
            setTmpDeploymentData(deploymentData);
        } 
        else setIsEditable(true);
    };

    const handleSave = () => {
        handleModeChange(automatic, trigger);

        if (props.isNewDeployment) {
            console.log(tmpDeploymentData);
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
            console.log("PUT");
            console.log(tmpDeploymentData);
            DeploymentsService.
            updateDeploymentDeploymentsDeploymentIdPut(tmpDeploymentData);
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
    
    const handleCheckChange = (mode: string) => {
        if (mode === "automatic") {
            setAutomatic({...automatic, isAutomatic: !automatic.isAutomatic});
        };
        if (mode === "trigger") {
            setTrigger({...trigger, isTrigger: !trigger.isTrigger});
        };
    };

    const handleValueMode = (mode: string, param: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (mode === "automatic") {
            automatic[param] = event.target.value;
            setAutomatic(automatic);
        };
        if (mode === "trigger") {
            trigger[param] = event.target.value;
            setTrigger(trigger);
        };
    };

    return(
        <form>
            <Stack
                direction="column"
                spacing={5}
            >
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                >
                    {/* Si image du deploiement, la mettre sinon mettre zone drag&drop pour l'image */}
                    <Grid
                        item
                        lg={5}
                        height={200}
                        style={{ backgroundColor: "#afbdb6" }}
                    >
                        {
                            deployment_img ?
                                <img></img> :
                                <DropzoneComponent sentence={capitalize(t("main.add_media"))}/>
                        }
                    </Grid>

                    <Grid 
                        item
                        lg={5}
                        style={{ backgroundColor: "#98d4b7" }}
                        height={200}
                    >
                        Map
                    </Grid>
                </Stack>

                <Paper elevation={0} sx={{ px: 2, py: 2 }}>
                    <DialogTitle variant="subtitle2">
                        <TurnedInNotTwoToneIcon style={{ verticalAlign: "middle" }} />
                        {capitalize(t("deployments.features"))}
                    </DialogTitle>

                    <Grid container spacing={2}>
                        {(props.isNewDeployment || isEditable) &&
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <TextField 
                                    id="name"
                                    name="name"
                                    label={capitalize(t("deployments.name"))}
                                    required
                                    defaultValue={tmpDeploymentData?.name}
                                    onChange={(e) => handleFormChange("name", e.target.value)}
                                    size="small"
                                    variant="filled"
                                    fullWidth
                                    // error={tmpDeploymentData?.name === ""}
                                    // helperText={tmpDeploymentData?.name === "" &&"Champs requis"}
                                />
                            </Grid>
                        }
                        
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="site_id"
                                name="site_id"
                                label={capitalize(t('sites.site'))}
                                select
                                value={ siteName }
                                onChange={
                                    (e) => handleFormChange("site_id", sites.find((s) => s.name === e.target.value).id)
                                }
                                size="small"
                                variant="filled"
                                fullWidth
                                required
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {sites.map((site) => (
                                    <MenuItem 
                                        key={site.id} 
                                        value={site.name}>
                                        {site.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField 
                                id="device_id"
                                name="device_id"
                                label={capitalize(t('devices.device'))}
                                select
                                value={ deviceName }
                                onChange={
                                    (e) => handleFormChange("device_id", devices.find((d) => d.name === e.target.value).id)
                                }
                                size="small"
                                variant="filled"
                                fullWidth
                                required
                                disabled={!props.isNewDeployment && !isEditable}
                            >
                                {devices.map((device) => (
                                    <MenuItem 
                                        key={device.id} 
                                        value={device.name}>
                                        {device.name}
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
                                    {capitalize(t("sites.add_site"))}
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label={capitalize(t("projects.start_date"))}
                                    inputFormat="dd/MM/yyyy"
                                    value={tmpDeploymentData?.start_date || null}
                                    onChange={(date) => handleDateChange("start_date", date)}
                                    renderInput={(params) => <TextField size="small" variant="filled" required {...params} />}
                                    disabled={!props.isNewDeployment && !isEditable}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label={capitalize(t("projects.end_date"))}
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
                                label={capitalize(t("deployments.hanging"))}
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.support}
                                onChange={(e) => handleFormChange("support", e.target.value)}
                                size="small"
                                variant="filled"
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
                                label={capitalize(t('deployments.features'))}
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.feature}
                                onChange={(e) => handleFormChange("feature", e.target.value)}
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
                                label={capitalize(t("deployments.height"))}
                                name="height"
                                value={tmpDeploymentData?.height}
                                onChange={(e) => handleFormChange("height", e.target.value)}
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
                                label={capitalize(t("deployments.bait"))}
                                defaultValue=""
                                select
                                value={tmpDeploymentData?.bait}
                                onChange={(e) => handleFormChange("bait", e.target.value)}
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
                                <TurnedInNotTwoToneIcon style={{ verticalAlign: "middle" }} />
                                {capitalize(t("deployments.auto_mode_settings"))}
                            </DialogTitle>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch checked={automatic.isAutomatic} />} 
                                        onChange={ () => handleCheckChange("automatic") }
                                        label="Automatique" 
                                        disabled={!props.isNewDeployment && !isEditable}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label={capitalize(t("deployments.img_nb"))}
                                        value={automatic?.imageNumber}
                                        onChange={(e) => handleValueMode("automatic", "imageNumber", e)}
                                        inputProps={{
                                            step: 1,
                                            min: 1,
                                            type: 'number',
                                            'aria-labelledby': 'input-slider',
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !automatic.isAutomatic}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label={capitalize(t("deployments.frequency"))}
                                        value={automatic?.frequency}
                                        onChange={(e) => handleValueMode("automatic", "frequency", e)}
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
                                        disabled={(!props.isNewDeployment && !isEditable) || !automatic.isAutomatic}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={props.isNewDeployment?12:6} lg={props.isNewDeployment?12:6}>
                        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
                            <DialogTitle variant="subtitle2">
                                <TurnedInNotTwoToneIcon style={{ verticalAlign: "middle" }} />
                                 {capitalize(t("deployments.trigger_mode_settings"))}
                            </DialogTitle>

                            <Grid container spacing={3}>
                            
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControlLabel 
                                        control={<Switch  checked={trigger.isTrigger} />} 
                                        onChange={() => handleCheckChange("trigger")}
                                        label={capitalize(t("deployments.trigger"))} 
                                        disabled={!props.isNewDeployment && !isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label={capitalize(t("deployments.img_nb"))}
                                        value={trigger?.imageNumber}
                                        onChange={(e) => handleValueMode("trigger", "imageNumber", e)}
                                        inputProps={{
                                            step: 1,
                                            min: 1,
                                            type: 'number'
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !trigger.isTrigger}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <TextField 
                                        label={capitalize(t("deployments.frequency"))}
                                        value={trigger?.frequency}
                                        onChange={(e) => handleValueMode("trigger", "frequency", e)}
                                        inputProps={{
                                            step: 0.05,
                                            min: 0.05,
                                            max: 1,
                                            type: 'number'
                                        }}
                                        size="small"
                                        variant="filled"
                                        fullWidth
                                        disabled={(!props.isNewDeployment && !isEditable) || !trigger.isTrigger}
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
                        label={capitalize(t("main.description"))}
                        defaultValue=""
                        value={tmpDeploymentData?.description}
                        onChange={(e) => handleFormChange("description", e.target.value)}
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
                                    <><CancelIcon />{capitalize(t("main.modify"))}</> : 
                                    <><EditIcon />{capitalize(t("main.cancel"))}</>
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
                                {capitalize(t("main.save"))}
                            </Button>
                        </Stack>
                    ) : (
                        <Stack justifyContent="flex-end" direction="row">
                            <Button 
                                onClick={handleSave} 
                                color="primary"
                                variant="contained"
                            >
                                {capitalize(t("main.save"))}
                            </Button>
                        </Stack>
                    )
                }
            </Stack>
        </form>
    )
};
export default DeploymentForm;