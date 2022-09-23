import { Button, Chip, Grid, Input, MenuItem, Stack, TextField, Typography } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useEffect, useState } from "react";
import { useMainContext } from "../contexts/mainContext";
import { DeploymentForProjectSheet, ProjectsService, ProjectWithDeployment } from "../client";
import { useParams } from "react-router-dom";


const ImportForm = (
    props
) => {
 
    const {projects, deployments} = useMainContext();

    const [projectList, setProjectList] = useState<ProjectWithDeployment[]>();
    const [selectedValues, setSelectedValues] = useState({id_project: undefined, id_deployment: undefined});
    const [deploymentList, setDeploymentList] = useState<DeploymentForProjectSheet[]>();
    const [isProjectSet, setIsProjectSet] = useState(false);

    let params = useParams();

    useEffect(() => {
        setProjectList(projects);
        setDeploymentList(deployments);

        let updatedImportParams = {...props.importParams};
        if (props.projectIsSet) {
            updatedImportParams["id_project"] = Number(params.projectId);
            if (props.projectId) {
                updatedImportParams["id_project"] = Number(props.projectId);
            };
            if (props.deploymentIsSet) {
                updatedImportParams["id_deployment"] = Number(params.deploymentId);
            };
            setIsProjectSet(true);
            props.setImportParams(updatedImportParams);
            setSelectedValues(updatedImportParams);
        };

    }, []);

    useEffect(() => {
        selectedValues.id_project &&
        ProjectsService
            .getInformationsProjectProjectsProjectInformationsProjectIdGet(selectedValues.id_project)
            .then((projectData) => {
                setDeploymentList(projectData.deployments);
                })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedValues]);

    const handleFormChange = (
        paramName: string, 
        value: number | undefined
    ) => {
        let updatedImportParams = {...props.importParams};
        if (paramName === "id_project") {
            setIsProjectSet(true);
            updatedImportParams["id_deployment"] = undefined;
        }
        updatedImportParams[paramName] = value;
        props.setImportParams(updatedImportParams);
        setSelectedValues(updatedImportParams);
    };
    
    const onChange = (e) => {
        let currentFiles = [...props.files];
        Array.prototype.slice.call(e.target.files).forEach((newFile) => {
            if (currentFiles.findIndex((currentFile) => currentFile.name === newFile.name) === -1) {
                currentFiles.push(newFile);
            }
        });
        props.setFiles(currentFiles);
    };

    const handleDelete = (filename: string) => {        
        let currentFiles = [...props.files];
        let i = currentFiles.findIndex((f) => f.name === filename);
        currentFiles.splice(i, 1);
        props.setFiles(currentFiles);
        
    };
    
    return(
        <form>
            <Stack
                direction="column"
                spacing={3}
            >
                {
                    !props.projectIsSet ? (
                        <TextField 
                            id="id_project"
                            name="id_project"
                            label="Projet"
                            defaultValue=""
                            select
                            value={selectedValues.id_project}
                            onChange={(e) => handleFormChange("id_project", projectList?.find((p) => p.name === e.target.value)?.id)}
                            variant="filled"
                            fullWidth
                        >
                            {projectList?.map((projectOption) => (
                                <MenuItem
                                    key={projectOption.id}
                                    value={projectOption.name}
                                >
                                    {projectOption.name}
                                </MenuItem>
                            ))

                            }
                        </TextField>
                    ) : (
                        <Typography variant="overline">
                            {`Projet : ${projectList?.find((p) => p.id === selectedValues.id_project)?.name}`}
                        </Typography>
                    )
                }

                {
                    !props.deploymentIsSet ? (
                        <TextField 
                            id="id_deployment"
                            name="id_deployment"
                            label="Déploiement"
                            defaultValue=""
                            select
                            value={selectedValues.id_deployment}
                            onChange={(e) => handleFormChange("id_deployment", deploymentList?.find((d) => d.name === e.target.value)?.id)}
                            variant="filled"
                            fullWidth
                            disabled = {!isProjectSet}
                        >
                            {deploymentList?.map((deploymentOption) => (
                                <MenuItem
                                    key={deploymentOption.id}
                                    value={deploymentOption.name}
                                >
                                    {deploymentOption.name}
                                </MenuItem>
                            ))

                            }
                        </TextField>
                    ) : (
                        <Typography variant="overline">
                            {`Déploiement : ${deploymentList?.find((d) => d.id === selectedValues.id_deployment)?.name}`}
                        </Typography>
                    )
                }
                
                <Stack direction="row" justifyContent="center">
                    <Button
                        startIcon={<CloudDownloadIcon />} 
                        variant="contained" 
                        color="secondary"
                    >
                        <Input 
                            onChange={onChange}
                            type="file"
                            inputProps={{ multiple: true }}
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                top: '0',
                                bottom: '0',
                                right: '0',
                                left: '0',
                                width: '100%',
                                opacity: '0'
                            }}
                        />
                        Choisir fichier(s)
                    </Button>
                </Stack>

                <Grid container justifyContent="center" spacing={1}>
                    {props.files.map((file) => (
                        <Grid item>
                            <Chip 
                                label={file.name}
                                variant="outlined" 
                                color="secondary"
                                onDelete={() => handleDelete(file.name)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </form>
    )
};

export default ImportForm;