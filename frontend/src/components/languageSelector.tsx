import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";

import { FormControl, Select, MenuItem, Typography } from "@mui/material";

const LanguageSelector: FC = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language.split("-")[0]
  );

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const hanleLangChange = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <FormControl
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSvgIcon-root": {
          fill: "#47B9B2",
        },
      }}
    >
      <Select
        value={currentLanguage}
        displayEmpty
        label={currentLanguage}
        onChange={(e) => hanleLangChange(e.target.value)}
        renderValue={(value) => (
          <Typography color="white" sx={{ mr: 2, textTransform: "uppercase" }}>
            {value}
          </Typography>
        )}
      >
        {languages.map((lng) => (
          <MenuItem key={lng} value={lng}>
            {t(`languageSelector.${lng}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
