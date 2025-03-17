import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, capitalize, IconButton, Tooltip } from "@mui/material";
import { useFilesContext } from "../../contexts/filesContext";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FilesService } from "../../client";
import frLocale from "date-fns/locale/fr";

interface MetadataDateTimeInputProps {
    id: string;
    date: Date | null;
};

const MetadataDateTimeInput: FC<MetadataDateTimeInputProps> = (
    props
) => {

    const { t } = useTranslation();
    const { updateListFile } = useFilesContext();
    const [date, setDate] = useState<Date | null>(props.date);

    const [toSave, setToSave] = useState<boolean>(false);

    const update = (value: Date | null) => {
        setDate(value);
        setToSave(true);
    };

    const save = () => {
        FilesService
        .updateAnnotationsFilesAnnotationFileIdPatch(props.id, { metadata: { date: date?.toISOString() }} )
        .then(res => {
            setToSave(false);
            updateListFile();
        })
        .catch((err) => {
            console.log("Error during metadata saving.");
            console.log(err);
        });
    };

    const cancel = () => {
        setDate(props.date);
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
                    value={date}
                    onChange={(newValue) => update(newValue)}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm:ss"
                    renderInput={(params) => (
                        <TextField {...params} sx={{ width: "300px" }} />
                    )}
                />
            </LocalizationProvider>
            {toSave && ( <>
                <Tooltip title={capitalize(t("main.save"))} arrow>
                    <IconButton
                        onClick={ save }
                        sx={{ mr: 0, color: "primary.main" }}
                    >
                        <SaveIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={capitalize(t("main.cancel"))} arrow>
                    <IconButton
                        onClick={ cancel }
                        sx={{ mr: 0, color: "secondary.main" }}
                    >
                        <CancelIcon/>
                    </IconButton>
                </Tooltip>
            </>)
            }                    
        </Box>
    )
};

export default MetadataDateTimeInput;