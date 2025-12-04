import { useState, useEffect, FC, useRef } from "react";
import { Box, capitalize } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale/fr";
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
        adapterLocale={fr}
      >
        <DateTimePicker
          label={capitalize(t("projects.start_date"))}
          value={dateRange.start_date}
          onChange={(date) => handleChange("start_date", date)}
          onClose={onClose}
          onAccept={onClose}
          onError={(error) => console.log("Erreur de saisie :", error)}
          format="dd/MM/yyyy HH:mm:ss"
          ampm={false}
          slotProps={{
            textField: {
              size: "small",
              sx: { width: "215px" },
              InputProps: {
                inputComponent: (props) => {
                  const { inputRef, ...other } = props;
                  return (
                    <InputMask
                      mask="99/99/9999 99:99:99"
                      {...other}
                      ref={inputRef}
                      maskChar="_"
                    />
                  );
                },
              },
            },
          }}
        />

        <DateTimePicker
          label={capitalize(t("projects.end_date"))}
          value={dateRange.end_date}
          onChange={(date) => handleChange("end_date", date)}
          onClose={onClose}
          format="dd/MM/yyyy HH:mm:ss"
          ampm={false}
          slotProps={{
            textField: {
              size: "small",
              sx: { width: "215px" },
              InputProps: {
                inputComponent: (props) => {
                  const { inputRef, ...other } = props;
                  return (
                    <InputMask
                      mask="99/99/9999 99:99:99"
                      {...other}
                      ref={inputRef}
                      maskChar="_"
                    />
                  );
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRange;
