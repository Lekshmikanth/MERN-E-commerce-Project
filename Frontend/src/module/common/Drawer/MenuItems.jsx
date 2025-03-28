
import { ListItem, ListItemButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import expandActive from "../../../assets/images/expand_more_active.png";
import expandItems from "../../../assets/images/expand_more_items.png";
import expandMore from "../../../assets/images/expand_more_top.png";
import { Components } from "../../../common/components";
import Dropdown from "./Dropdown";

const { Box } = Components;

const MenuItems = ({ items, depthLevel, path, current }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [link, setLInk] = useState("/");
  const hovers = {
    "&:hover": {
      border: "1px solid #00FF00",
      color: "gray",
      backgroundColor: "red",
      display: "none"
    }
  };
  let itemWidth = "100%";
  if (!depthLevel) {
    itemWidth = "auto";
  }
  let ref = useRef();
  if (items.path) {

    path += "/" + items.path;
  }

  useEffect(() => {
    setLInk(path);
  }, [path]);

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }

    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };
  let color;
  depthLevel === 0 ? color = "" : color = "#04746F";
  let active;
  // eslint-disable-next-line no-unused-expressions
  current ? current.includes(items.path) ? active = "active" : "" : "";
  const navigator = () => {
    if (items.path) {

      navigate(link);
    }
  };
  if (!items.title) {
    return;
  }
  return (
    <ListItem
      color="primary"
      sx={{ position: "relative", flexDirection: "column", px: 1, display: { sm: "none", md: "flex", xs: "none", alignItems: "left", backgroundColor: color }, hovers }}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={"submenu"}
    >
      {
        items.title && items.children ? (
          <>
            <ListItemButton
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={navigator}
              className={depthLevel === 0 ? active : "menuitems"}
              sx={{ width: itemWidth, p: 0.5 }}

            >
              {depthLevel === 0 ? (
                <>
                  {items?.title}
                  <Box component="img" src={current && current.includes(items.path) ? expandActive : expandMore}></Box>
                </>
              ) : (
                <>
                  <ListItem onClick={navigator} sx={{ display: "block" }} >{items?.title} </ListItem>
                  <Box component="img" src={expandItems}></Box>
                </>
              )}
            </ListItemButton>
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.children}
              dropdown={dropdown}
              path={path}

            />
          </>
        ) : !items.path && items.children ? (
          <>
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.children}
              dropdown={dropdown}
              path={path}
            />
          </>
        ) : (
          <ListItemButton
            color="background"
            sx={{ display: "block", width: itemWidth, px: 2 }}
            onClick={navigator}
            className={depthLevel === 0 ? active : "menuitems"}
          >
            {items?.title}
          </ListItemButton>
        )
      }
    </ListItem >
  );
};

export default MenuItems;
