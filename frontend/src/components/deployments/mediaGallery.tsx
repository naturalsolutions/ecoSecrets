import Masonry from "@mui/lab/Masonry";
import { Box, capitalize, Pagination, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import GalleryItem from "./GalleryItem";
import MediaFilters from "./Filters";
import { useFilesContext } from "../../contexts/filesContext";
import { useEffect, useState } from "react";

export default function MediaGallery() {
  const { files, paginationFiles, updateListFile } = useFilesContext();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    updateListFile((page - 1) * 24, 24);
  }, [page]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 829,
        paddingTop: "2vh",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {capitalize(t("deployments.deploy_gallery"))}
      </Typography>
      <MediaFilters />
      <Masonry columns={6} spacing={2}>
        {files.length > 0 ? (
          files.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))
        ) : (
          <p>{capitalize(t("main.no_data"))}</p>
        )}
      </Masonry>
      <Pagination
        count={paginationFiles?.totalPages}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
}
