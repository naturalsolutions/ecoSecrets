
import { useState } from "react";
import { useMainContext } from '../../contexts/mainContext';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography, capitalize } from "@mui/material";
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import { DeploymentsService } from "../../client";
import { useTranslation } from "react-i18next";
import DialogYesNo from "../common/dialogYesNo";


const ProjectDeploymentDeleteModale = (
    props
) => {
    const { t } = useTranslation()
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
                        {capitalize(t("deployments.delete"))}
                    </Typography>
                </DialogTitle>
                    <IconButton onClick = {handleCloseDeleteDeployment} >
                    <ClearTwoToneIcon/>
                    </IconButton>
                </Stack>
                <Divider />
                <DialogContent>
                    <Typography>
                        {capitalize(t("deployments.ask_delete"))}
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogYesNo onYes={ deleteDeployment } onNo={ handleCloseDeleteDeployment } />
            </Dialog>        
        </>
    )
};

export default ProjectDeploymentDeleteModale;
