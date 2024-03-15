import { capitalize } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonCancel from "./buttonCancel";
import ButtonValidate from "./buttonValidate";

export default function ButtonsYesNo({
    onYes, 
    onNo,
    yesContent="",
    noContent=""
}) {
    const { t } = useTranslation();
    return (
        <>
            <ButtonCancel content={ noContent ? noContent : capitalize(t("main.no")) } cancel={ onNo } />
            <ButtonValidate content={ yesContent ? yesContent : capitalize(t("main.yes")) } validate={ onYes } />
        </>
    )
}