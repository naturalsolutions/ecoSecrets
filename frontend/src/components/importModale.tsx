import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import ImportForm from "./importForm";
import { useMainContext } from "../contexts/mainContext";
import { useEffect, useState } from "react";
import { FilesService } from "../client";


const ImportModale = (
    props
) => {
    const {updateListFile, updateProjectsStats, updateGlobalStats} = useMainContext();
    const [files, setFiles] = useState<any[]>([]);
    const [importParams, setImportParams] = useState({id_project: 0, id_deployment: 0, projectIsSet: false, deploymentIsSet: false});

    const saveImport = () => {
        for (const file of files) {
            FilesService
            .uploadFileFilesUploadDeploymentIdPost(importParams.id_deployment, { file })
            .then(() => {
                updateListFile();
                updateProjectsStats();
                updateGlobalStats();
            });
        }
        setFiles([]);
        props.close();
    };

    const closeModale = () => {
        setFiles([]);
        props.close();
    };

    return(
        <Dialog open={props.open}>
            <DialogTitle
                variant="h6" 
            >
                <Stack 
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    Importer des médias
                    <IconButton onClick = {() => closeModale()} >
                        <ClearTwoToneIcon/>
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent
                dividers={true}
            >
                <ImportForm 
                    files={files} 
                    setFiles={setFiles} 
                    importParams={importParams}
                    setImportParams={setImportParams}
                    projectIsSet={props.projectIsSet}
                    deploymentIsSet={props.deploymentIsSet}
                    projectId={props.projectId}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={saveImport}
                >
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportModale;