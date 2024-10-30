import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertTitle, Paper, Stack, Link, capitalize, TableSortLabel, TextField, Tooltip, IconButton, Menu, MenuItem, Popover, FormControl, InputLabel, Select } from "@mui/material";
import { useMainContext } from '../../contexts/mainContext';
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import ProjectDeploymentDeleteModale from "./projectDeploymentsDeleteModale";
import FilterListIcon from '@mui/icons-material/FilterList';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ProjectDeployments = () => {
  const { t } = useTranslation();
  const { projectSheetData, sites, devices } = useMainContext();

  const [sortType, setSortType] = useState<"asc" | "desc" | undefined>('asc'); // État pour suivre le type de tri (ascendant ou descendant)
  const [sortBy, setSortBy] = useState('name'); // État pour suivre la colonne par laquelle trier
  const [filter, setFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterBy, setFilterBy] = useState('name'); // Par défaut, filtrer par nom

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    if(sortBy === "name")
      {
        sortByName(projectSheetData.deployments, sortType)
      }
      else {
        sortByDate(projectSheetData.deployments, sortType)
      }
  })

  const allSorts = (property, data, sortType) => {
    if(property === "name" || property === "devices")
      {
        sortByName(projectSheetData.deployments, sortType)
      }
      else if(property === "start_date") {
        console.log(property)
        sortByDate(projectSheetData.deployments, sortType)
      }
      else if(property === "end_date") {
        sortByEndDate(projectSheetData.deployments, sortType)
      }
      else if(property === "sites") {
        sortBySites(projectSheetData.deployments, sortType)
      }
  }


  
  const handleSort = (property) => {
    
    if(sortBy === property)
      {
        console.log("here 1")
        const newSortType = sortType === 'asc' ? 'desc' : 'asc';
        setSortType(newSortType);
        allSorts(property, projectSheetData.deployments, newSortType)
      }
      else {
        console.log("here")
        const newSortType =  'asc';
        setSortType(newSortType);
        allSorts(property, projectSheetData.deployments, newSortType)
      }
    
    setSortBy(property);


  };

  const sortByName = (data, sortType) => {
    return data.sort((a, b) => {
      if(sortType==="desc")
        {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        }
        else {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;     
        }

    })
  }

  const sortByDate = (data, sortType) => {

    if(sortType==="desc")
      {
        return data.sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA.getTime() - dateB.getTime();
        });        
      }
      else {
        return data.sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateB.getTime() - dateA.getTime();
        });  
      }

  };

  const sortByEndDate = (data, sortType) => {

    if(sortType==="desc")
      {
        return data.sort((a, b) => {
          const dateA = new Date(a.end_date);
          const dateB = new Date(b.end_date);
          return dateA.getTime() - dateB.getTime();
        });        
      }
      else {
        return data.sort((a, b) => {
          const dateA = new Date(a.end_date);
          const dateB = new Date(b.end_date);
          return dateB.getTime() - dateA.getTime();
        });  
      }

  };

  const sortBySites = (data, sortType) => {
    return data.sort((a, b) => {

      let siteA = sites?.find(element => element.id == a.site_id);
      let siteB = sites?.find(element => element.id == b.site_id);
      const nameA = siteA.name.toUpperCase()
      const nameB = siteB.name.toUpperCase()

      if(sortType==="desc")
        {
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        }
        else {
          return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;     
        }

    })
  }
  const getSite = (index) => {
    let site = sites?.find(element => element.id == index);
    return <Link component={RouterLink} to={`/sites/${site?.id}`}>{site?.name}</Link>
  }

  const getDevices = (index) => {
    let device = devices?.find(element => element.id == index);
    return <Link component={RouterLink} to={`/devices/${device?.id}`}>{device?.name}</Link>
  }

  return (
    projectSheetData.deployments.length !== 0 ?
      <Stack
        spacing={2}
        justifyContent="center"
      >

        <TableContainer component={Paper}>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">

            <TableHead style={{ backgroundColor: "#CCDFD9" }}>

              <TableRow>

                <StyledTableCell align="center">
                <TableSortLabel
            active={sortBy === "name"}
            direction={sortType}
            onClick={() => handleSort('name')}
          >
                  {capitalize(t("main.name"))}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                <TableSortLabel
            active={sortBy === "start_date"}
            direction={sortType}
            onClick={() => handleSort('start_date')}
          >
                  {capitalize(t("projects.start_date"))}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                <TableSortLabel
            active={sortBy === "end_date"}
            direction={sortType}
            onClick={() => handleSort('end_date')}
          >
                  {capitalize(t("projects.end_date"))}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                <TableSortLabel
            active={sortBy === "sites"}
            direction={sortType}
            onClick={() => handleSort('sites')}
          >
                {capitalize(t("projects.site_name"))}
                </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                <TableSortLabel
            active={sortBy === "devices"}
            direction={sortType}
            onClick={() => handleSort('devices')}
          >
                  {capitalize( t("projects.device_name"))}
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize( t("projects.import_media"))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {capitalize(t("deployments.delete"))}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectSheetData.deployments.map((row, k) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{
                    <Link
                      component={RouterLink}
                      to={`/project/${projectSheetData.id}/deployment/${row.id}/details`}
                    >
                      {row.name}
                    </Link>
                  }</StyledTableCell>
                  <StyledTableCell align="center">{row.start_date ? new Date(row.start_date).toLocaleDateString() : null}</StyledTableCell>
                  <StyledTableCell align="center">{row.end_date ? new Date(row.end_date).toLocaleDateString() : null}</StyledTableCell>
                  <StyledTableCell align="center">{getSite(row.site_id)}</StyledTableCell>
                  <StyledTableCell align="center">{getDevices(row.device_id)}</StyledTableCell>
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
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack> :
      <Alert severity="warning" >
        <AlertTitle>{capitalize(t("projects.alert"))}</AlertTitle>
        {capitalize(t("projects.alert_msg"))}
      </Alert>
  );
};
export default ProjectDeployments;
