import { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import InputTaxo from "./TaxonomicInputs";
import DateFilter from "../common/DateRangePicker";
import { useMainContext } from "../../contexts/mainContext";

const MediaFilters = () => {
  const { filters, setFilters } = useMainContext();
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
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", flexWrap: "wrap" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <DateFilter onChange={updateFilters} reset={reset} />
        </Grid>
        <InputTaxo rank="classe" reset={reset} />
        <InputTaxo rank="order" reset={reset} />
        <InputTaxo rank="family" reset={reset} />
        <InputTaxo rank="genus" reset={reset} />
        <InputTaxo rank="species" reset={reset} />
        <Grid item>
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
        </Grid>
      </Grid>
    </Box>
  );
};
export default MediaFilters;
