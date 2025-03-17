import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, capitalize, IconButton, Tooltip } from "@mui/material";
import { FilesService } from "../../client";
import { useFilesContext } from "../../contexts/filesContext";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface MetadataDateTimeInputProps {
    id: string;
    date: Date | null;
};

const MetadataDateTimeInput: FC<MetadataDateTimeInputProps> = (
    props
) => {

    const { t } = useTranslation();
    const { currentImage, files, updateListFile } = useFilesContext();
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
        setToSave(false);
        setDate(props.date);
    };

    useEffect(() => {
        setDate(files.find(item => item.id === props.id).date);
    }, [files, currentImage]);

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
                    inputFormat="yyyy/MM/dd HH:mm:ss"
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