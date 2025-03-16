import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, capitalize, IconButton } from "@mui/material";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { useFilesContext } from "../../contexts/filesContext";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FilesService } from "../../client";
import { format } from 'date-fns';


const MetadataDateTimeInput = () => {

    const { t } = useTranslation();
    const { currentImage } = useFilesContext();
    const { metadata } = useAnnotationContext();

    const [dateInput, setDateInput] = useState<Date | null>(metadata.date);
    const [toSave, setToSave] = useState<boolean>(false);

    const update = (value: Date | null) => {
        setDateInput(value);
        setToSave(true);
    };

    const save = () => {
        FilesService
        .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, { metadata: { date: dateInput?.toISOString() }} )
        .then(res => {
            setToSave(false);
        })
        .catch((err) => {
            console.log("Error during metadata saving.");
            console.log(err);
        });
    };

    const cancel = () => {
        setDateInput(metadata.date);
        setToSave(false);
    };

    return(
        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            width: "100%",
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
                <DateTimePicker
                    label={capitalize(t("medias.date_time_field"))}
                    value={dateInput}
                    onChange={(newValue) => update(newValue)}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                        <TextField {...params} sx={{ width: "300px" }} />
                    )}
                />
            </LocalizationProvider>
            {toSave && ( <>
                <IconButton
                    onClick={ save }
                    sx={{ mr: 0, color: "primary.main" }}
                >
                    <SaveIcon/>
                </IconButton>

                <IconButton
                    onClick={ cancel }
                    sx={{ mr: 0, color: "secondary.main" }}
                >
                    <CancelIcon/>
                </IconButton>
            </>)
            }                    
        </Box>
    )
};

export default MetadataDateTimeInput;