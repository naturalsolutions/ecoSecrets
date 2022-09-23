import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import DeploymentForm from "./deploymentForm";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';

const DeploymentCreationModale = (props) => {

    return(
        <>
            <Dialog open={props.openNewDeployment} onClose={props.handleCloseNewDeployment}>
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
                        <IconButton onClick = {props.handleCloseNewDeployment} >
                            <ClearTwoToneIcon/>
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers={true} id="scroll-dialog-description">
                    <DeploymentForm isNewDeployment={true} handleCloseNewDeployment={props.handleCloseNewDeployment} />
                </DialogContent>
            </Dialog>
        </>
    )
};
export default DeploymentCreationModale;