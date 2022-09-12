
import { useState } from "react";
import { useMainContext } from '../../contexts/mainContext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { DeploymentsService } from "../../client";


const ProjectDeploymentDeleteModale = (
    props
) => {
    
    const {updateProjectSheetData} = useMainContext();
    
    const [openDeleteDeployment, setOpenDeleteDeployment] = useState(false);

    const handleClickOpenDeleteDeployment = () => {
        setOpenDeleteDeployment(true);
    };

    const handleCloseDeleteDeployment = () => {
        setOpenDeleteDeployment(false);
    };

    const deleteDeployment = () => {
        DeploymentsService
        .deleteDeploymentDeploymentsDeploymentIdDelete(props.deploymentId)
        .then(() => {
            handleCloseDeleteDeployment();
            updateProjectSheetData();
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    return (
        <>
            <IconButton onClick={handleClickOpenDeleteDeployment}>
                <ClearTwoToneIcon/>
            </IconButton>
            <Dialog 
                open={openDeleteDeployment} 
                onClose={handleCloseDeleteDeployment
            }
            >
                <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                >
                <DialogTitle>
                    <Typography variant="h6">
                    Supprimer le déploiement
                    </Typography>
                </DialogTitle>
                    <IconButton onClick = {handleCloseDeleteDeployment} >
                    <ClearTwoToneIcon/>
                    </IconButton>
                </Stack>
                <Divider />
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir supprimer ce déploiement ? Cela engendrera la suppression de l'ensemble des médias et des données associées à ce déploiement.
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={deleteDeployment}>Oui</Button>
                    <Button onClick={handleCloseDeleteDeployment} color='secondary'>Non</Button>
                </DialogActions>
            </Dialog>        
        </>
    )
};

export default ProjectDeploymentDeleteModale;
