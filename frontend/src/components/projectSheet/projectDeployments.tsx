import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Alert,
  AlertTitle,
  Box,
  Paper,
  Stack,
  Link,
  capitalize,
  TableSortLabel,
} from "@mui/material";
import { useMainContext } from "../../contexts/mainContext";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectDeploymentDeleteModale from "./projectDeploymentsDeleteModale";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useTranslation } from "react-i18next";
import Filters from "./Filters";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProjectDeployments = () => {
  const { t } = useTranslation();
  const { projectSheetData } = useMainContext();
  const [deployments, setDeployments] = useState(projectSheetData.deployments);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...deployments].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA === null && valueB !== null)
        return direction === "asc" ? 1 : -1;
      if (valueA !== null && valueB === null)
        return direction === "asc" ? -1 : 1;
      if (valueA === null && valueB === null) return 0;

      if (key.includes("date")) {
        return direction === "asc"
          ? new Date(valueA).getTime() - new Date(valueB).getTime()
          : new Date(valueB).getTime() - new Date(valueA).getTime();
      }

      return direction === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });

    setDeployments(sortedData);
    setSortConfig({ key, direction });
  };

  const [filterValues, setFilterValues] = useState({
    name: null,
    start_date: null,
    end_date: null,
    site: null,
    device: null,
  });

  const handleFilterChange = (filters) => {
    setFilterValues(filters);
  };

  const filterData = (data, filters) => {
    return data.filter((item) => {
      const itemStartDate = new Date(item.start_date);
      const filterStartDate = filters.start_date
        ? new Date(filters.start_date)
        : null;
      const filterEndDate = filters.end_date
        ? new Date(filters.end_date)
        : null;

      const isWithinDateRange =
        (!filterStartDate || itemStartDate >= filterStartDate) &&
        (!filterEndDate || itemStartDate <= filterEndDate);

      const isSiteMatch = !filters.site || item.site_id === filters.site;
      const isDeviceMatch =
        !filters.device || item.device_id === filters.device;

      const isNameMatch = !filters.name || item.id === filters.name;

      return isWithinDateRange && isSiteMatch && isDeviceMatch && isNameMatch;
    });
  };

  useEffect(() => {
    const data = filterData(projectSheetData.deployments, filterValues);
    setDeployments(data);
  }, [filterValues, projectSheetData]);

  return projectSheetData.deployments.length !== 0 ? (
    <Stack spacing={0} justifyContent="center">
      <Box sx={{ display: "flex", width: "100%" }}>
        <Filters
          list={projectSheetData.deployments}
          onFilterChange={handleFilterChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ backgroundColor: "#CCDFD9" }}>
            <TableRow>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                <TableSortLabel onClick={() => sortData("name")}>
                  {capitalize(t("main.name"))}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                <TableSortLabel onClick={() => sortData("start_date")}>
                  {capitalize(t("projects.start_date"))}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                <TableSortLabel onClick={() => sortData("end_date")}>
                  {capitalize(t("projects.end_date"))}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                <TableSortLabel onClick={() => sortData("site_name")}>
                  {capitalize(t("projects.site_name"))}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                <TableSortLabel onClick={() => sortData("device_name")}>
                  {capitalize(t("projects.device_name"))}
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                {capitalize(t("projects.import_media"))}
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ flexGrow: 1 }}>
                {capitalize(t("deployments.delete"))}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((row, k) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="center">
                  {
                    <Link
                      component={RouterLink}
                      to={`/project/${projectSheetData.id}/deployment/${row.id}/details`}
                    >
                      {row.name}
                    </Link>
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.start_date
                    ? new Date(row.start_date).toLocaleDateString()
                    : null}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.end_date
                    ? new Date(row.end_date).toLocaleDateString()
                    : null}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    <Link component={RouterLink} to={`/sites/${row.site_id}`}>
                      {row.site_name}
                    </Link>
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    <Link component={RouterLink} to={`/sites/${row.device_id}`}>
                      {row.device_name}
                    </Link>
                  }
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    component={RouterLink}
                    to={`/project/${projectSheetData.id}/deployment/${row.id}/medias`}
                  >
                    <ControlPointIcon />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ProjectDeploymentDeleteModale deploymentId={row.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  ) : (
    <Alert severity="warning">
      <AlertTitle>{capitalize(t("projects.alert"))}</AlertTitle>
      {capitalize(t("projects.alert_msg"))}
    </Alert>
  );
};
export default ProjectDeployments;
