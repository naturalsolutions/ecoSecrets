import { useTranslation } from "react-i18next";
import { capitalize, Grid } from "@mui/material";
import AnnotationImageDisplay from "./AnnotationImageDisplay";
import AnnotationImageNavigation from "./AnnotationImageNavigation";
import { useMainContext } from "../../contexts/mainContext";

export default function AnnotationImage() {
  const { t } = useTranslation();
  const { image } = useMainContext();

  return (
    <>
      {image() ? (
        <Grid
          container
          direction="column"
          className="pageContainer"
          sx={{ overflow: "auto" }}
        >
          <AnnotationImageDisplay />
          <AnnotationImageNavigation />
        </Grid>
      ) : (
        <p>{capitalize(t("annotations.unknown_image"))}</p>
      )}
    </>
  );
}
