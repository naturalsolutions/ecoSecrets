import { useTranslation } from "react-i18next";
import { capitalize, Grid } from "@mui/material";
import AnnotationImageDisplay from "./AnnotationImageDisplay";
import AnnotationGalleryDisplay from "./AnnotationGalleryDisplay";
import AnnotationImageNavigation from "./AnnotationImageNavigation";
import { useFilesContext } from "../../contexts/filesContext";
import { useAnnotationContext } from "../../contexts/annotationContext";

export default function AnnotationImage() {
  const { t } = useTranslation();
  const { image } = useFilesContext();
  const { gridView } = useAnnotationContext();

  return (
    <>
      {image() ? (
        <Grid
          container
          direction="column"
          className="pageContainer"
          sx={{ overflow: "auto" }}
        >
          { gridView ? (
            <AnnotationGalleryDisplay />
          ) : (
            <Grid>
              <AnnotationImageDisplay />
              <AnnotationImageNavigation />
            </Grid>
          )}
        </Grid>
      ) : (
        <p>{capitalize(t("annotations.unknown_image"))}</p>
      )}
    </>
  );
}
