import { Button, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TurnedInNotTwoToneIcon from '@mui/icons-material/TurnedInNotTwoTone';import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMainContext } from "../contexts/mainContext";
import { useParams } from "react-router-dom";

const deployment_img = undefined;
const siteList = ["Site A", "Site B", "Site C"] //TO DO: get all sites

const DeploymentForm = (
    {isNewDeployment=false}
) => {
  
    const [isEditable, setIsEditable] = useState(false);
    const handleEdit = () => {
        isEditable ? setIsEditable(false) : setIsEditable(true)
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
    
    const handleStartDateChange = (newValue: Date | null) => {
        setStartDateValue(newValue);
    };
    const handleEndDateChange = (newValue: Date | null) => {
        setEndDateValue(newValue);
    };


    return(
        <Stack
            direction="column"
            spacing={5}
        >
            <Typography variant="h4">
                Nom du déploiement
            </Typography>
            
            <Stack
                direction="row"
                justifyContent="space-evenly"
            >
            {/* Si image du deploiement, la mettre sinon mettre zone drag&drop pour l'image */}
                {deployment_img ? (
                    <img></img>
                    ) : (
                    <Grid 
                        lg={5}
                        style={{backgroundColor: "#afbdb6"}}
                        height={200}
                    >
                        Test
                    </Grid>
                )}
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
                    {isNewDeployment &&
                        <Grid item  xs={12} sm={12} md={8} lg={8}>
                            <TextField 
                                label="Nom du déploiement"
                                size="small"
                                fullWidth 
                            />
                        </Grid>
                    }
                    
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            label="Site d'étude"
                            // value={!isNewDeployment?"Test":"None"}
                            select 
                            variant="outlined" 
                            type="search"
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
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <OutlinedInput
                            label="Hauteur du dispositif"
                            // value={}
                            // onChange={handleChange()}
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            inputProps={{
                                "aria-label": "Hauteur du dispositif",
                            }}
                            size="small"
                            fullWidth
                            disabled={!isNewDeployment && !isEditable}
                        />
                    </Grid>

                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date de début"
                                inputFormat="dd/MM/yyyy"
                                value={startDateValue}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField size="small" {...params} />}
                                disabled={!isNewDeployment && !isEditable}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date de fin"
                                inputFormat="dd/MM/yyyy"
                                value={endDateValue}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField size="small" {...params} />}
                                disabled={!isNewDeployment && !isEditable}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            label="Support d'accroche"
                            size="small"
                            fullWidth
                            disabled={!isNewDeployment && !isEditable}
                        />
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            label="Appât"
                            size="small"
                            fullWidth
                            disabled={!isNewDeployment && !isEditable}
                        />
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            label="Caractéristique"
                            size="small"
                            fullWidth
                            disabled={!isNewDeployment && !isEditable}
                        />
                    </Grid>
                    <Grid item  xs={12} sm={12} md={6} lg={6}>
                        <TextField 
                            label="Autre info"
                            size="small"
                            fullWidth
                            disabled={!isNewDeployment && !isEditable}
                        />
                    </Grid>
                </Grid>
            </Paper>
            
            <Stack
                direction={isNewDeployment?"column":"row"}
                justifyContent="center"
                spacing={2}
            >
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
                                fullWidth
                                disabled={(!isNewDeployment && !isEditable) || automatic}
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
                                fullWidth
                                disabled={(!isNewDeployment && !isEditable) || automatic}
                            />
                        </Grid>
                    </Grid>
                </Paper>

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
                                fullWidth
                                disabled={(!isNewDeployment && !isEditable) || !trigger}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                label="Mode"
                                select
                                size="small"
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
                                fullWidth
                                disabled={(!isNewDeployment && !isEditable) || !trigger}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>

            <Paper elevation={0}>
                <TextField 
                    label="Description"
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
    )
};
export default DeploymentForm;