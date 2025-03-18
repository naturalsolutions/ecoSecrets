import React, { useState, useEffect, FC } from "react";
import { Box, TextField, capitalize } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import { useTranslation } from "react-i18next";

export interface DateRange {
  start_date: Date | null;
  end_date: Date | null;
}

interface DateRangeProps {
  onChange: (dateRange: DateRange) => void;
  reset?: boolean;
  initValues?: DateRange;
}
const DateRange: FC<DateRangeProps> = ({ onChange, reset, initValues }) => {
  const { t } = useTranslation();
  const defaultValues = {
    start_date: null,
    end_date: null,
  };
  const [dateRange, setDateRange] = useState<DateRange>(
    initValues ? initValues : defaultValues
  );

  const handleChange = (key, value) => {
    setDateRange({ ...dateRange, [key]: value });
  };

  const onReset = () => {
    setDateRange(defaultValues);
    onChange(defaultValues);
  };

  useEffect(() => {
    reset && onReset();
  });

  const onClose = () => {
    onChange(dateRange);
  };

  return (
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
          label={capitalize(t("projects.start_date"))}
          value={dateRange.start_date}
          onChange={(date) => handleChange("start_date", date)}
          onClose={onClose}
          onError={(error) => console.log("Erreur de saisie :", error)}
          inputFormat="yyyy/MM/dd HH:mm:ss"
          ampm={false}
          renderInput={(params) => (
            <TextField {...params} size="small" sx={{ width: "215px" }} />
          )}
        />

        <DateTimePicker
          label={capitalize(t("projects.end_date"))}
          value={dateRange.end_date}
          onChange={(date) => handleChange("end_date", date)}
          onClose={onClose}
          inputFormat="yyyy/MM/dd HH:mm:ss"
          ampm={false}
          renderInput={(params) => (
            <TextField {...params} size="small" sx={{ width: "215px" }} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRange;
