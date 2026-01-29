import {
  Box,
  TextField,
  capitalize,
  Autocomplete,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import { useMainContext } from "../../contexts/mainContext";
import { Deployments } from "../../client/models/Deployments";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ObjectBase {
  id: number;
  name: string;
}

const Filters = (props) => {
  const { t } = useTranslation();
  const {
    project,
    sites,
    currentProject,
    deployments,
    devices,
    projectSheetData,
  } = useMainContext();
  const [start_date, setStartDate] = useState<Date | null>(null);
  const [end_date, setEndDate] = useState<Date | null>(null);
  const [name, setName] = useState<Deployments | undefined | null>(null);
  const [sNname, setSName] = useState<ObjectBase | undefined | null>(null);
  const [dName, setDName] = useState<ObjectBase | undefined | null>(null);
  const [siteList, setSiteList] = useState<ObjectBase[]>([]);
  const [deviceList, setDeviceList] = useState<ObjectBase[]>([]);
  const [deploymentList, setdeploymentList] = useState<[]>(
    project().deployments
  );

  const getSites = () => {
    props.list.forEach((item) => {
      setSiteList((prevSiteList) => {
        if (!prevSiteList.some((site) => site.id === item.site_id)) {
          return [...prevSiteList, { id: item.site_id, name: item.site_name }];
        }
        return prevSiteList;
      });
    });
  };

  const getDevices = () => {
    props.list.forEach((item) => {
      setDeviceList((prevSiteList) => {
        if (!prevSiteList.some((device) => device.id === item.device_id)) {
          return [
            ...prevSiteList,
            { id: item.device_id, name: item.device_name },
          ];
        }
        return prevSiteList;
      });
    });
  };

  useEffect(() => {
    getSites();
    setDeviceList([]);
    getDevices();
    setdeploymentList(projectSheetData.deployments);
  }, [currentProject, deployments, sites, devices, projectSheetData]);

  const updateParentFilters = () => {
    props.onFilterChange({
      name: name?.id,
      start_date,
      end_date,
      site: sNname?.id,
      device: dName?.id,
    });
  };

  useEffect(() => {
    updateParentFilters();
  }, [start_date, end_date, name, dName, sNname]);


  const resetFilters = () => {
    props.onFilterChange({
      name: null,
      start_date: null,
      end_date: null,
      site: null,
      device: null,
    });
    setName(null);
    setSName(null);
    setDName(null);
    setStartDate(null);
    setEndDate(null)
  };


  return (
    <Box
      component="form"
      sx={{
        display: "grid",
        flexWrap: "wrap",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 2,
        width: "65%",
        marginBottom: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        options={deploymentList}
        getOptionLabel={(option) => option.name}
        value={name}
        onChange={(event, newValue) => setName(newValue!)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth label="Nom" />
        )}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          format="dd/MM/yyyy"
          label={capitalize(t("projects.start_date"))}
          value={start_date}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{
            textField: {
              variant: "outlined",
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          format="dd/MM/yyyy"
          label={capitalize(t("projects.end_date"))}
          value={end_date}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{
            textField: {
              variant: "outlined",
            },
          }}
        />
      </LocalizationProvider>
      <Autocomplete
        options={siteList}
        getOptionLabel={(option) => option.name}
        value={sNname}
        onChange={(event, newValue) => setSName(newValue!)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth label="Site" />
        )}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
      />
      <Autocomplete
        options={deviceList}
        getOptionLabel={(option) => option.name}
        value={dName}
        onChange={(event, newValue) => setDName(newValue!)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            label="Dispositif"
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
      />
      <Tooltip title={capitalize(t("filters.refresh"))} arrow>
        <IconButton
          aria-label="reset"
          size="large"
          color="secondary"
          sx={{
            border: "1px solid",
            borderColor: "secondary",
            borderRadius: "5px",
            padding: "8px",
            width: "60px",
          }}
          onClick={resetFilters}
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default Filters;
