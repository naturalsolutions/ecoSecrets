import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, capitalize, IconButton, Tooltip } from "@mui/material";
import { FilesService } from "../../client";
import { useFilesContext } from "../../contexts/filesContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from 'date-fns/locale';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useMainContext } from "../../contexts/mainContext";
import InputMask from "react-input-mask";

interface MetadataDateTimeInputProps {
  id: string;
  date: Date | null;
}

const MetadataDateTimeInput: FC<MetadataDateTimeInputProps> = (props) => {
  const { t } = useTranslation();
  const { currentDeployment } = useMainContext();
  const { currentImage, files, updateListFile } = useFilesContext();
  const [date, setDate] = useState<Date | null>(props.date);
  const [toSave, setToSave] = useState<boolean>(false);

  const update = (value: Date | null) => {
    setDate(value);
    setToSave(true);
  };

  const InputMaskAdapter = (props) => (
    <InputMask
      mask="99/99/9999 99:99:99"
      maskChar="_"
      {...props}
    />
  );

  const save = () => {
    FilesService.updateAnnotationsFilesAnnotationFileIdPatch(props.id, {
      metadata: { date: date?.toISOString() },
      deployment_id: currentDeployment,
    })
      .then((res) => {
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
    const file = files.find((item) => item.id === currentImage);
    setDate(file.date ? new Date(file.date) : null);
  }, [files, currentImage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        width: "100%",
      }}
    >
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={fr}
      >
        <DateTimePicker
          label={capitalize(t("medias.date_time_field"))}
          value={date}
          onChange={(newValue: Date | null) => update(newValue)}
          ampm={false}
          format="dd/MM/yyyy HH:mm:ss"
          onError={(error) => {
            if (error) console.log("Erreur de saisie start_date :", error);
          }}
          slotProps={{
            textField: {
              sx: { width: "300px" },
              InputProps: {
                inputComponent: InputMaskAdapter as any,
              },
            },
          }}
        />
      </LocalizationProvider>
      {toSave && (
        <>
          <Tooltip title={capitalize(t("main.save"))} arrow>
            <IconButton onClick={save} sx={{ mr: 0, color: "primary.main" }}>
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={capitalize(t("main.cancel"))} arrow>
            <IconButton
              onClick={cancel}
              sx={{ mr: 0, color: "secondary.main" }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default MetadataDateTimeInput;
