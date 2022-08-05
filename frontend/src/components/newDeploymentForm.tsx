import { Button, Checkbox, Grid, Input, Paper, Slider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";


const deployment_img = undefined;

const NewDeploymentForm = () => {
        
    const [automatic, setAutomatic] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [autoNumber, setAutoNumber] = useState<null | Number>(null);
    const [triggerNumber, setTriggerNumber] = useState<null | Number>(null);
    const [autoFreq, setAutoFreq] = useState<null | Number>(null);
    const [triggerFreq, setTriggerFreq] = useState<null | Number>(null);


    const handleAutomaticChange = () => {
        setAutomatic(!automatic);
        if (!automatic) {
            setAutoNumber(1);
            setAutoFreq(0.05);
        }
        if (automatic) {
            setAutoNumber(Number());
            setAutoFreq(Number());
        }
    };

    const handleTriggerChange = () => {
        setTrigger(!trigger);
        if (!trigger) {
            setTriggerNumber(1);
            setTriggerFreq(0.05);
        }
        if (trigger) {
            setTriggerNumber(Number());
            setTriggerFreq(Number());
        }
    };

    const handleAutoNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoNumber(Number(event.target.value));
    };
    
    const handleTriggerNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriggerNumber(Number(event.target.value));
    };

    const handleAutoFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoFreq(Number(event.target.value));
    };
    
    const handleTriggerFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTriggerFreq(Number(event.target.value));
    };

    // const handleTriggerSliderChange = (newValue) => {
    //     setTriggerFreq(newValue);
    // };

    // const handleTriggerFreqChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTriggerFreq(Number(event.target.value));
    // };

    // const handleBlur = (value) => {
    // if (value < 0) {
    //     setTriggerFreq(0);
    // } else if (value > 100) {
    //     setTriggerFreq(1);
    // }
    // };

    // const [startDateValue, setStartDateValue] = useState<Date | null>(
    //     new Date(),
    // );
    // const [endDateValue, setEndDateValue] = useState<Date | null>(
    //     new Date(),
    // );
    
    // const handleStartDateChange = (newValue: Date | null) => {
    //     setStartDateValue(newValue);
    // };

    // const handleEndDateChange = (newValue: Date | null) => {
    //     setEndDateValue(newValue);
    // };


    return(
        <form>
            <Stack
                spacing={5}
                direction="column"
                alignItems="stretch"
                sx={{ flexGrow: 1 }}
            >
            
                <Typography variant='h1'>
                    Nouveau déploiement
                </Typography>

                <Stack
                    spacing={10}
                    direction="row"
                    justifyContent="space-evenly"
                >
                    {/* Si image du deploiement, la mettre sinon mettre zone drag&drop pour l'image */}
                    {deployment_img ? (
                        <img></img>
                    ) : (
                        <Grid 
                            lg={4}
                            style={{backgroundColor: "#afbdb6"}}
                            height={400}
                        >
                            Test
                        </Grid>
                    )}
                    <Grid 
                        lg={4}
                        style={{backgroundColor: "#98d4b7"}}
                        height={400}
                    >
                        Map
                    </Grid>
                    
                </Stack>

                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="stretch"
                    sx={{ flexGrow: 1 }}
                    justifyContent="space-around"
                >
                    <TextField label="Nom" />
                    <TextField label="Site d'étude" />
                    <TextField label="Dispositif" />
                </Stack>

                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="stretch"
                    sx={{ flexGrow: 1 }}
                    justifyContent="center"
                >
                    <TextField label="Date de début" />
                    <TextField label="Date de fin" />
                    {/* <DesktopDatePicker
                        label="Date de début"
                        inputFormat="MM/dd/yyyy"
                        value={startDateValue}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}

                    {/* <DesktopDatePicker
                        label="Date de fin"
                        inputFormat="MM/dd/yyyy"
                        value={endDateValue}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}
                </Stack>

                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="stretch"
                    sx={{ flexGrow: 1 }}
                    justifyContent="space-evenly"
                >
                    <TextField label="Appât" />
                    <TextField label="Caractéristique" />
                    <TextField label="Hauteur" />
                    <TextField label="Support d'accroche" />
                </Stack>
                <Stack 
                    direction="row" 
                    spacing={2}
                    justifyContent="center"
                >
                    <Stack
                        spacing={2}
                    >
                        <Stack 
                            direction="row" 
                            justifyContent="flex-start"
                            alignItems="center"
                            >
                            <Checkbox 
                                onChange={handleAutomaticChange}
                            /> 
                            <Typography>Automatique</Typography>
                        </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                            >
                            <Typography>Nombre d'image par séquence :</Typography>
                            {/* <TextField
                                value={autoNumber}
                                disabled={!automatic}
                                variant={!automatic ? "filled" : "outlined"}
                            /> */}
                            <Input 
                                value={autoNumber}
                                onChange={handleAutoNumberChange}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                sx={{ width: 50 }}
                                disabled={!automatic}
                            />
                        </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                            >
                            <Typography>Fréquence :</Typography>
                            {/* <TextField
                                value={autoFreq}
                                disabled={!automatic}
                                variant={!automatic ? "filled" : "outlined"}
                            /> */}
                            <Input 
                                value={autoFreq}
                                onChange={handleAutoFreqChange}
                                inputProps={{
                                    step: 0.05,
                                    min: 0.05,
                                    max: 1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                sx={{ width: 50 }}
                                disabled={!automatic}
                            />
                        </Stack>
                    </Stack>
                    <Stack
                        spacing={2}
                    >
                        <Stack 
                            direction="row" 
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <Checkbox 
                                onChange={handleTriggerChange}
                            /> 
                            <Typography>Déclenchement</Typography>
                        </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography>Nombre d'image par séquence :</Typography>
                            {/* <TextField 
                                disabled={!trigger}
                                variant={trigger ? "outlined" : "filled"}
                            /> */}
                            <Input 
                                value={triggerNumber}
                                onChange={handleTriggerNumberChange}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                sx={{ width: 50 }}
                                disabled={!trigger}
                            />
                        </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography>Fréquence :</Typography>
                            {/* <TextField
                                disabled={!trigger}
                                variant={trigger ? "outlined" : "filled"}
                            /> */}
                            <Input 
                                value={triggerFreq}
                                onChange={handleTriggerFreqChange}
                                inputProps={{
                                    step: 0.05,
                                    min: 0.05,
                                    max: 1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                sx={{ width: 50 }}
                                disabled={!trigger}
                            />
                            {/* <Slider
                                value={triggerFreq}
                                onChange={handleTriggerSliderChange}
                                aria-labelledby="input-slider"
                                disabled={!trigger}
                                size="small"
                                sx={{ width: 1/2 }}
                            />
                            <Input
                                value={triggerFreq}
                                onChange={handleTriggerFreqChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 0.05,
                                    min: 0,
                                    max: 1,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                                
                                disabled={!trigger}
                            /> */}
                        </Stack>
                    </Stack>
                </Stack>
                <TextField 
                    label="Commentaire"
                    multiline
                    rows={5}
                    // sx={{ width: {1/2} }}
                />
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                >
                    <Button 
                        variant="contained"
                    >
                        CREER
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
};
export default NewDeploymentForm;