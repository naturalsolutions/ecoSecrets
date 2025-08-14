import { useState, useEffect, FC, useRef } from "react";
import { Box, TextField, capitalize } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import InputMask from "react-input-mask";
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
  const isResetting = useRef(false);

  const handleChange = (key, value) => {
    setDateRange({ ...dateRange, [key]: value });
  };

  const onReset = () => {
    isResetting.current = true;
    setDateRange(defaultValues);
    onChange(defaultValues);
  };

  useEffect(() => {
    reset && onReset();
  });

  const onClose = () => {
    onChange(dateRange);
  };

  useEffect(() => {
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }
    if (dateRange.start_date instanceof Date || dateRange.end_date instanceof Date) {
      onChange(dateRange);
    }
  }, [dateRange]);

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
        adapterLocale={frLocale}
      >
        <DateTimePicker
          label={capitalize(t("projects.start_date"))}
          value={dateRange.start_date}
          onChange={(date) => handleChange("start_date", date)}
          onClose={onClose}
          onAccept={onClose}
          onError={(error) => console.log("Erreur de saisie :", error)}
          inputFormat="dd/MM/yyyy HH:mm:ss"
          ampm={false}
          renderInput={(params) => {
            const inputProps = params.inputProps || {};
            return (
              <InputMask
                mask="99/99/9999 99:99:99"
                value={inputProps.value}
                onChange={inputProps.onChange}
                maskChar="_"
              >
                {(maskedInputProps) => (
                  <TextField
                    {...params}
                    {...maskedInputProps}
                    size="small"
                    sx={{ width: "215px" }}
                  />
                )}
              </InputMask>
            );
          }}
        />

        <DateTimePicker
          label={capitalize(t("projects.end_date"))}
          value={dateRange.end_date}
          onChange={(date) => handleChange("end_date", date)}
          onClose={onClose}
          inputFormat="dd/MM/yyyy HH:mm:ss"
          ampm={false}
          renderInput={(params) => {
            const inputProps = params.inputProps || {};
            return (
              <InputMask
                mask="99/99/9999 99:99:99"
                value={inputProps.value}
                onChange={inputProps.onChange}
                maskChar="_"
              >
                {(maskedInputProps) => (
                  <TextField
                    {...params}
                    {...maskedInputProps}
                    size="small"
                    sx={{ width: "215px" }}
                  />
                )}
              </InputMask>
            );
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRange;
