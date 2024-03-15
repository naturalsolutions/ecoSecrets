import {
  capitalize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SiteBase, SitesService } from "../../client";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import { useMainContext } from "../../contexts/mainContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonValidate from "../common/buttonValidate";

export default function SiteModale(props) {
  const { t } = useTranslation();
  const { updateSites } = useMainContext();
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState<SiteBase>({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const onclick = () => {
    setOpen(true);
  };

  const handleFormChange = (
    params: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Date | null
  ) => {
    let tmp_site_data = { ...site };
    if (e)
      tmp_site_data[params] =
        e instanceof Date ? e.toISOString().slice(0, 10) : e.target.value;
    setSite(tmp_site_data);
  };

  const navigate = useNavigate();
  const save = () => {
    SitesService.createSiteSitesPost(site)
      .then((s) => {
        updateSites();
        setOpen(false);
        navigate(`/sites/${s.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid>
      {props.page == "deploymentPage" ? (
        <ButtonValidate
          content={capitalize(t("sites.new"))}
          validate={() => onclick()}
          startIcon="add"
        />
      ) : (
        <IconButton
          aria-label="menu"
          onClick={() => onclick()}
          sx={{ mr: 2, display: { color: "#2FA37C" } }}
        >
          <AddCircleIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <DialogTitle>
            <Typography variant="h6">
              {capitalize(t("sites.new_site"))}
            </Typography>
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <ClearTwoToneIcon />
          </IconButton>
        </Stack>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label={capitalize(t("main.name"))}
                value={site.name}
                onChange={(e) => handleFormChange("name", e)}
                fullWidth
                variant="filled"
              />
            </Grid>
            <Grid item lg={6} md={6}>
              <TextField
                required
                label={capitalize(t("sites.longitude"))}
                id="longitude"
                inputProps={{ type: "number" }}
                value={site.longitude}
                fullWidth
                variant="filled"
                onChange={(e) => handleFormChange("longitude", e)}
              />
            </Grid>
            <Grid item lg={6} md={6}>
              <TextField
                required
                label={capitalize(t("sites.latitude"))}
                name="latitude"
                id="latitude"
                inputProps={{ type: "number" }}
                value={site.latitude}
                fullWidth
                variant="filled"
                onChange={(e) => handleFormChange("latitude", e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <ButtonValidate content={t("main.save")} validate={save} />
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
