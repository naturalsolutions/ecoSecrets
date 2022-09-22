import React from "react";
import { IconButton, Link, Menu, MenuItem, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from "@mui/icons-material/Home";

const ITEM_HEIGHT = 48;

const BreadcrumbElement = (
  props
) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
    >
      <Link
          underline={ props.isActive ? "none" : "hover" }
          color={ props.isActive ? "#00000" : "#2fa37c" }
          href={props.isActive ? undefined : props.link}
          variant="body2"
        >
        <Stack
          direction="row"
          justifyContent="center"
        >
          { props.icon && <HomeIcon fontSize="small"/> }
          { props.current_option || "test" }
        </Stack>
      </Link>

      { props.options && 
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ExpandMoreIcon fontSize="small"/>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              }
            }}
          >
            {props.options?.map((option) => (
              <MenuItem
                dense
                key={option.id} 
                selected={option.name === props.current_option}
                component={Link}
                href={props.linkSuffix ? (`${props.parentlink}/${option.id}/${props.linkSuffix}`): (`${props.parentlink}/${option.id}`)}
                onClick={handleClose}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    </Stack>
  )
};

export default BreadcrumbElement;