import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Grid, IconButton, Tooltip, capitalize } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import InputTaxo from "./TaxonomicInputs";
import DateRange from "../common/DateRangePicker";
import { useFilesContext } from "../../contexts/filesContext";
import GridSwitcher from "../annotation/GridSwitcher";

const MediaFilters = () => {
  const { t } = useTranslation();
  const { filters, setFilters, currentImage } = useFilesContext();
  const [reset, setReset] = useState<boolean>(false);

  const updateFilters = (dateRange: {
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...dateRange,
    }));
  };

  const resetFilters = () => {
    setFilters({});
    setReset(true);
  };

  useEffect(() => {
    setReset(false);
  }, [filters]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      {currentImage && <GridSwitcher />}

      <Grid
        container
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ width: "100%", flexWrap: "wrap" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DateRange
            onChange={updateFilters}
            reset={reset}
            initValues={{
              start_date: filters.start_date,
              end_date: filters.end_date,
            }}
          />
        </Grid>
        <InputTaxo rank="classe" reset={reset} />
        <InputTaxo rank="order" reset={reset} />
        <InputTaxo rank="family" reset={reset} />
        <InputTaxo rank="genus" reset={reset} />
        <InputTaxo rank="species" reset={reset} />
        <Grid item>
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
              }}
              onClick={resetFilters}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MediaFilters;
