import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Grid, Typography, Stack, Button, TextField, MenuItem, Divider, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Collapse, Alert, AlertTitle, Box, ListItem, AlertColor, capitalize } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMainContext } from "../contexts/mainContext";
import { ProjectBase, ProjectsService } from "../client";
import { Snack } from "../client/models/Snack";
import { useSnackContext } from "../contexts/snackContext";
import { useTranslation } from "react-i18next";

export default function ProjectModal(props) {
    const { t } = useTranslation()
    const { updateProjects, setCurrentProject, updateProjectSheetData } = useMainContext();
    const [open, setOpen] = useState(false);
    const [projectData, setProjectData] = useState<ProjectBase>({ name: '', protocol: '', creation_date: '', acquisition_framework: '', targeted_species: '', owner_id: 1, contact_id: 1 });
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const protocoles = ["Protocole A", "Protocole B", "Protocole C"];
    const species = ["Loup", "Coccinelle", "Ours", "Chamois", "Chevreuil", "Cerf", "Marmotte", "Renard", "Aigle"];


    const { setSnack } = useSnackContext();



    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleFormChange = (params: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let tmp_project_data = { ...projectData };
        tmp_project_data[params] = e.target.value;
        setProjectData(tmp_project_data);
    }

    const handleChangeDate = (params: string, d: Date | null) => {
        let tmp_project_data = { ...projectData };
        d !== null && (tmp_project_data[params] = d.toISOString().slice(0, 10));
        setProjectData(tmp_project_data);
    }

    const handleClose = () => {
        setOpen(false);
        setProjectData({ name: '', protocol: '', creation_date: '', acquisition_framework: '', targeted_species: '', owner_id: 1, contact_id: 1 });
        setStartDate(null);
        setEndDate(null);
    };
    const navigate = useNavigate();
    const save = () => {
        const maDate = new Date()
        const data = { ...projectData }
        data['creation_date'] = maDate.toISOString().slice(0, 10)
        ProjectsService.createProjectProjectsPost(data).then((p) => {
            updateProjects();
            setOpen(false);
            setSnack(new Snack({ message: "Projet créée", color: 'success', autoHideDuration: 1500, open: true }))
            navigate(`/project/${p.id}`)

        }).catch((err) => {
            setSnack(new Snack({ message: err.body.detail[0].msg, color: 'error', autoHideDuration: 1500, open: true }))
            console.log(err.body);
        });
    };

    return (
        <Grid>

            {props.page == 'home' ?
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    color='secondary'
                    onClick={handleClickOpen}
                >
                    {`${capitalize(t("main.new"))} ${t("projects.project")}`}
                </Button>
                :
                <IconButton onClick={handleClickOpen} aria-label="menu" color='primary' sx={{ mr: 2 }}>
                    <AddCircleIcon />
                </IconButton>
            }

            <Dialog open={open} onClose={handleClose}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <DialogTitle>
                        <Typography variant="h6">
                            {`${capitalize(t("main.new"))} ${t("projects.project")}`}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={handleClose} >
                        <ClearTwoToneIcon />
                    </IconButton>
                </Stack>
                <Divider />
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item lg={12}>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <TextField
                                id="name"
                                name="name"
                                label={capitalize(t("main.name"))}
                                value={projectData.name}
                                onChange={(e) => handleFormChange("name", e)}
                                fullWidth
                                required
                                variant="filled"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <TextField
                                select
                                label={capitalize(t("projects.acquisition_framework"))}
                                variant="filled"
                                value={projectData.acquisition_framework}
                                fullWidth
                                onChange={(e) => handleFormChange("acquisition_framework", e)}
                            >
                                {protocoles.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <TextField
                                label={capitalize(t("projects.target_specie"))}
                                id="targetedSpecies"
                                select
                                value={projectData.targeted_species}
                                fullWidth
                                variant="filled"
                                onChange={(e) => handleFormChange("targeted_species", e)}

                            >
                                {species.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    label={capitalize(t("projects.start_date"))}
                                    value={startDate}
                                    onChange={(startDate) => {
                                        setStartDate(startDate);
                                        handleChangeDate("start_date", startDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="filled" />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    label={capitalize(t("projects.end_date"))}
                                    value={endDate}
                                    onChange={(endDate) => {
                                        setEndDate(endDate);
                                        handleChangeDate("end_date", endDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="filled" />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <TextField
                                id="protocol"
                                name="protocol"
                                label={capitalize(t("projects.protocol_methods"))}
                                value={projectData.protocol}
                                onChange={(e) => handleFormChange("protocol", e)}
                                fullWidth
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={save} style={{ color: "#2FA37C" }}>{ capitalize(t("main.save")) }</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}