import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DrawerDropdown from "./DrawerDropdown";
import { GiAbstract020, GiBackgammon, GiField, GiTeacher} from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { useSelector } from "react-redux";

const DrawerMenu = ({ item, path, depth, index, setShowSidebar }) => {
  const location = useLocation();
  const [openCollapse, setOpenCollapse] = useState(true);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }
  const [link, setLInk] = useState("../");
  const navigate = useNavigate();
  if (item.path) {
    path += "/" + item.path;
  }
  useEffect(() => {
    setLInk(path);
  }, [path]);

  const navigator = () => {
    if (item.path) {
      navigate(link);
      setShowSidebar(false);
    }
  };
  let active = {
    color: "grey"
  };
  if (path === location.pathname) {
    active = {
      color: "white.main",
      bgcolor: "black",
      fontWeight: "700 !important",
      pointerEvents: "none"
    };
  }
  let icon = "";
  if (depth === 0) {
    if (index === 0) {
      icon = "";
    } else if (index === 1) {
      icon = "";
    } else if (index === 2) {
      icon = "";
    } else if (index === 3) {
      icon = "";
    } else if (index === 4) {
      icon = <GiField />;
    } else if (index === 5) {
      icon = <GiTeacher />;
    } else if (index === 6) {
      icon = <GoReport />;
    } else if (index === 7) {
      icon = <GiAbstract020 />;
    } else if (index===8) {
      icon=<GiBackgammon/>;
    } else {
      icon = <GiBackgammon />;
    }
  }
  if (depth === 1) {
    if (index === 0) {
      icon = "";
    } else if (index === 1) {
      icon = "";
    } else if (index === 2) {
      icon = "";
    } else if (index === 3) {
      icon = "";
    } else if (index === 4) {
      icon = "";
    } else if (index === 5) {
      icon = "";
    } else if (index === 6) {
      icon = "";
    } else if (index === 7) {
      icon = "";
    }
  }
  if (depth === 2) {
    if (index === 0) {
      icon = "";
    } else if (index === 1){
      icon = "";
    } else if (index === 2){
      icon = "";
    } else if (index === 3){
      icon = "";
    }
  }

  if (depth === 3){
    if (index ===0) {
      icon = "";
    } else if (index === 1){
      icon = "";
    }
  }
  let hide = openCollapse ? "none" : "block";
  let rotate = openCollapse ? "rotate(-90deg)" : "rotate(90deg)";
  let listBackground = openCollapse ? "#000" : "";
  let activeLine =
    depth !== 0
      ? {
        "&::before": {
          content: '""', // eslint-disable-line quotes
          position: "absolute",
          // left: "-2px",
          top: "-12px",
          bottom: "-12px",
          height: "100%"
        }
      }
      : "";
  const activeRole = useSelector(state => state?.profileDetails?.userRoleData?.data?.activeRole?.name);

  function checkIDs(objArr) {

    for (let i = 0; i < objArr?.length; i++) {
      const obj = objArr[i];
      // Check if the ID exists in the current object

      // Check if the object has child arrays
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          // Recursively check the child arrays
          if (checkIDs(obj[key])) {
            return true;
          }
        }
      }
    }
  }

  return (
    <List
      sx={{
        flexDirection: "column",
        alignItems: "start",
        color: "black.main",
        pl: 0.5
      }}
      key={item.title}
      disablePadding
    >
      {item.children?.length > 0 ? (
        <>
          {item?.children[0].children ? (
            <>
              {(activeRole === "SUPER ADMIN" || checkIDs(item?.children)) &&
                <ListItemButton
                  sx={{
                    ...active,
                    width: "100%",
                    pl: 1
                  }}
                  onClick={handleOpenSettings}
                >
                  {icon}
                  <ListItemText sx={{ pl: 1 }} primary={item.title} />
                  {item.children?.length > 0 && (
                    <ChevronLeftOutlinedIcon
                      className={openCollapse}
                      sx={{ transform: rotate }}
                    />
                  )}
                </ListItemButton>
              }
              <ListItem
                sx={{
                  ...activeLine,
                  display: hide,
                  px: 1.5,
                  bgcolor: listBackground
                }}
              >
                <DrawerDropdown
                  submenu={item.children}
                  path={path}
                  depth={depth}
                  setShowSidebar={setShowSidebar}
                />
              </ListItem>
            </>
          ) : (
            (checkIDs(item?.children)) &&
            <ListItem sx={{}} disablePadding>
              <ListItemButton
                sx={{
                  ...active,
                  ...activeLine,
                  textAlign: "",
                  pl: 1.5
                }}
                onClick={navigator}
              >
                {icon}
                <ListItemText sx={{ pl: 1, ...active }} primary={item.title} />
              </ListItemButton>
            </ListItem>
          )}
        </>
      ) : (
        item.title === "Dashboard" && (
          <ListItemButton
            sx={{
              ...activeLine,
              width: "100%",
              pl: 1
            }}
            onClick={() => navigate("/Dashboard")}
          >
            {icon}
            <ListItemText sx={{ pl: 1 }} primary={item.title} />
          </ListItemButton>
        )
      )}
    </List>
  );
};

export default DrawerMenu;
