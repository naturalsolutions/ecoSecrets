import { Grid, Stack, Typography, capitalize } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useMainContext } from "../../contexts/mainContext";
import { useState } from "react";
import { DeviceMenu } from "../../client";
import ForestIcon from "@mui/icons-material/Forest";
import { useTranslation } from "react-i18next";
import ButtonDisplay from "../common/buttonDisplay";

export default function DeviceData() {
  const { device } = useMainContext();
  const [deviceData, setDeviceData] = useState<DeviceMenu>(device());
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-evenly">
      <Stack alignItems="center" justifyContent="center">
        <Typography color="secondary" gutterBottom variant="h3" component="div">
          {deviceData.status == "Déployé" ? (
            <ForestIcon
              fontSize="large"
              sx={{ display: { color: "secondary" } }}
              style={{ verticalAlign: "middle" }}
            />
          ) : (
            <CheckCircleIcon
              fontSize="large"
              sx={{ display: { color: "secondary" } }}
              style={{ verticalAlign: "middle" }}
            />
          )}
        </Typography>
        <ButtonDisplay content={ deviceData.status } />
      </Stack>
      <Stack alignItems="center" justifyContent="center" spacing={2.5}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CameraAltIcon fontSize="large" color="secondary" />
          </Grid>
          <Grid item>
            <Typography color="secondary" variant="h3">
              {deviceData.nb_images}
            </Typography>
          </Grid>
        </Grid>
        <ButtonDisplay content={ capitalize(t("devices.nb_media")) } />
      </Stack>
      <Stack alignItems="center" justifyContent="center">
        <CalendarTodayIcon fontSize="large" color="secondary" />
        <Typography color="secondary" gutterBottom variant="h6" component="div">
          {deviceData.last_image_date}
        </Typography>
        <ButtonDisplay content={ capitalize(t("devices.last_media")) } />
      </Stack>
    </Stack>
  );
}
