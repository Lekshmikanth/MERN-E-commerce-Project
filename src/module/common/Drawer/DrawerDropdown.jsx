import { List } from "@mui/material";
import DrawerMenu from "./DrawerMenu";

const DrawerDropdown = ({ submenu, path, depth, setShowSidebar }) => {

  depth++;
  return (
    <List sx={{ py: 1, px: 0.5, backgroundColor: "#E2E0E1 ", borderRadius: 1 }}>
      {submenu.map((child, index) => (
        <DrawerMenu
          key={index}
          item={child}
          path={path}
          depth={depth}
          index={index}
          setShowSidebar={setShowSidebar}
        />
      ))}
    </List>
  );
};

export default DrawerDropdown;
