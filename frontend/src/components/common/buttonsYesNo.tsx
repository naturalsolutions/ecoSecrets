import { capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonCancel from "./buttonCancel";
import ButtonValidate from "./buttonValidate";

export default function ButtonsYesNo({onYes, onNo}) {
    const { t } = useTranslation();
    return (
        <>
            <ButtonCancel content={ capitalize(t("main.no")) } cancel={ onNo } />
            <ButtonValidate content={ capitalize(t("main.yes")) } validate={ onYes } />
        </>
    )
}