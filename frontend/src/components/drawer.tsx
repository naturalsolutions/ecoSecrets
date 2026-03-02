import { FC } from "react";
import { List, ListItem, ListItemButton} from "@mui/material";
import { Link } from "react-router-dom";

const pages = [
  { label: "Mes projets", url: "projects" },
  { label: "Mon matos", url: "devices" },
  { label: "Mes sites", url: "sites" },
  { label: "Import/Export", url: "import" },
];

const Drawer: FC<{}> = () => {
  return (
    <div>
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton>
              <Link to={page.url}>{page.label}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default Drawer;
