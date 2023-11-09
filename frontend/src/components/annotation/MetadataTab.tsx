import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, capitalize } from "@mui/material";
import TabPanel from "../tabPanel";

interface MetadataTabProps {
    valueTab: number,
    index: number
};


const MetadataTab: FC<MetadataTabProps> = ({
    valueTab,
    index
}) => {
    const { t } = useTranslation();

    return(
        <TabPanel 
            valueTab={ valueTab } 
            index={ index }
        >
            <Alert severity="info">
                { capitalize(t("main.unavailable")) }
            </Alert>
        </TabPanel >
    )
};
export default MetadataTab;