import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import DeploymentForm from "./deploymentForm";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { DeploymentBase, Deployments, DeploymentsService } from "../client";
import { useMainContext } from "../contexts/mainContext";

const DeploymentCreationModale = () => {
    const { currentProject } = useMainContext();

    const [openNewDeployment, setOpenNewDeployment] = useState(false);

    const handleOpenNewDeployment = () => {
        setOpenNewDeployment(true);
    };
    
    const handleCloseNewDeployment = () => {
        setOpenNewDeployment(false);
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

            <Dialog open={openNewDeployment} onClose={handleCloseNewDeployment}>
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
                    <DeploymentForm isNewDeployment={true} handleCloseNewDeployment={handleCloseNewDeployment} />
                </DialogContent>
            </Dialog>
        </>
    )
};
export default DeploymentCreationModale;