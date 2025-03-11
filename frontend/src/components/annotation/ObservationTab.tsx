import {
  capitalize,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import ObservationForm from "./ObservationForm";
import TabPanel from "../tabPanel";
import ButtonStatus from "../common/buttonStatus";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useAnnotationContext } from "../../contexts/annotationContext";
import { Annotation, FilesService } from "../../client";
import { FC, useState } from "react";
import ConfirmDialog from "../common/confirmDialog";
import { useMainContext } from "../../contexts/mainContext";

interface ObservationTabProps {
  valueTab: number;
  index: number;
}

const ObservationTab: FC<ObservationTabProps> = ({ valueTab, index }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { observations, annotated, treated, checked, handleCheckChange, next } =
    useAnnotationContext();

  const { currentImage, updateListFile } = useMainContext();

  const save = () => {
    FilesService.deleteFileFilesDeleteFileIdDelete(currentImage).then((res) => {
      updateListFile();
      setOpen(false);
      next();
    });
  };

  return (
    <TabPanel valueTab={valueTab} index={index}>
      <span className="info-annotation-ctn">
        <IconButton
          aria-label="reset"
          size="large"
          color="error"
          sx={{
            border: "1px solid",
            borderColor: "secondary",
            borderRadius: "5px",
            padding: "8px",
          }}
          onClick={() => setOpen(true)}
        >
          <DeleteIcon />
        </IconButton>
        <ConfirmDialog
          open={open}
          title={t("annotations.delete") as string}
          message={t("annotations.delete_desc") as string}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            save();
          }}
        />
        {treated ? (
          <ButtonStatus
            icon={<CheckCircleRoundedIcon sx={{ color: "#4CAF50" }} />}
            title={capitalize(t("annotations.media_processed_manually"))}
            stylClassButton="valid"
          />
        ) : annotated ? (
          <ButtonStatus
            icon={<HelpRoundedIcon sx={{ color: "#FF9800" }} />}
            title={capitalize(t("observations.not_saved"))}
            stylClassButton="info"
          />
        ) : (
          <ButtonStatus
            icon={<HelpRoundedIcon sx={{ color: "#F44336" }} />}
            title={capitalize(t("annotations.media_not_processed"))}
            stylClassButton="warning"
          />
        )}
        <FormControlLabel
          id="switch-empty-control"
          control={
            <Switch
              id="switch-empty"
              checked={checked}
              onChange={handleCheckChange}
            />
          }
          label={capitalize(t("annotations.empty_media"))}
        />
      </span>

      {observations?.map((observation: Annotation, index: number) => (
        <ObservationForm
          key={observation.id}
          index={index + 1}
          observation={observation}
        />
      ))}
    </TabPanel>
  );
};
export default ObservationTab;
