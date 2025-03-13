import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, capitalize } from "@mui/material";
import TabPanel from "../tabPanel";
import { useAnnotationContext } from "../../contexts/annotationContext";
import NestedList from "../common/collapsableButton";
import AlertUnavailable from "../common/AlertUnavailable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";

interface MetadataTabProps {
    valueTab: number;
    index: number;
};

const MetadataTab: FC<MetadataTabProps> = ({
    valueTab,
    index
}) => {
    const { t } = useTranslation();
    const { date, setDate } = useAnnotationContext();
    const { selectedMedias } = useAnnotationContext();
    const { gridView } = useAnnotationContext();

    return(
        
        <TabPanel 
            valueTab={ valueTab } 
            index={ index }
        >
            { gridView ? 
                (selectedMedias.map((item) => (
                    <NestedList 
                        text={ item.name }
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                          <DateTimePicker
                            label={capitalize(t("medias.date_time_field"))}
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            ampm={false}
                            inputFormat="yyyy/MM/dd HH:mm:ss"
                            renderInput={(params) => (
                              <TextField {...params} sx={{ width: "220px" }} />
                            )}
                          />
                        </LocalizationProvider>
                    </NestedList>
            ))) :
                <AlertUnavailable/>
            }
        </TabPanel >
    )
};
export default MetadataTab;