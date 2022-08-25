import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import DeploymentForm from "./deploymentForm";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { DeploymentBase, DeploymentsService } from "../client";
import { useMainContext } from "../contexts/mainContext";

const NewDeploymentModale = () => {
    // const {currentProject} = useMainContext();
    
    const [openNewDeployment, setOpenNewDeployment] = useState(false);
    // const [newDeploymentData, setNewDeploymentData] = useState(
    //     {
    //         name: undefined,
    //         start_date: undefined,
    //         end_date: undefined,
    //         site_id: undefined,
    //         device_id: undefined,
    //         bait: undefined,
    //         feature: undefined,
    //         description: undefined,
    //         project_id: currentProject,
    //         template_sequence_id: undefined
    //     }
    // );

    const handleOpenNewDeployment = () => {
        console.log('click create new deployment');
        setOpenNewDeployment(true);
    };
    const handleCloseNewDeployment = () => {
        console.log('click cancel new deployment');
        setOpenNewDeployment(false);
    };
    const saveNewDeployement = () => {
        console.log("click save new deployment");
        setOpenNewDeployment(false);
        // DeploymentsService
        // .createDeploymentDeploymentsPost(newDeploymentData);
    };

    return(
        <>
            <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />} 
                style={{backgroundColor: "#BCAAA4"}}
                onClick={handleOpenNewDeployment}
            >
                Nouveau déploiement
            </Button>

            <Dialog open={openNewDeployment} onClose= {handleCloseNewDeployment}>
                <DialogTitle 
                    variant="h6" 
                    id="scroll-dialog-title"
                >
                    <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        Nouveau déploiement
                        <IconButton onClick = {handleCloseNewDeployment} >
                            <ClearTwoToneIcon/>
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers={true} id="scroll-dialog-description">
                    <DeploymentForm isNewDeployment={true}/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={saveNewDeployement} style={{color: "#2FA37C"}}>
                        Enregistrer
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
};
export default NewDeploymentModale;