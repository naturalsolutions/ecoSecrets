import { FC, useState, MouseEvent } from "react";
import { IconButton, Link, Menu, MenuItem, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ITEM_HEIGHT = 48;

interface BreadcrumbElementProps {
  key: string;
  current_option: string;
  link: string;
  isActive: boolean;
  parentlink?: string;
  options?: any;
  linkSuffix?: string;
};

const BreadcrumbElement: FC<BreadcrumbElementProps> = (
  props
) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
    >
      <Link
        underline={props.isActive ? "none" : "hover"}
        color={props.isActive ? "#00000" : "#2fa37c"}
        href={props.isActive ? undefined : props.link}
        variant="body2"
      >
        <Stack
          direction="row"
          justifyContent="center"
        >
          { props.current_option }
        </Stack>
      </Link>

      {props.options &&
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ExpandMoreIcon fontSize="small" />
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
            {props.options?.map((option, k) => (
              <MenuItem
                dense
                key={k}
                selected={option.name === props.current_option}
                component={Link}
                href={props.linkSuffix ? (`${props.parentlink}/${option.id}/${props.linkSuffix}`) : (`${props.parentlink}/${option.id}`)}
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