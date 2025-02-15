import { Box, List, Typography } from "@mui/material";
import { routes } from "../../routes";
import CloseIcon from "@mui/icons-material/Close";
import DrawerMenu from "./DrawerMenu";
// import { checkUserTypeMenuPermissions } from "utils/permissionUtils";

const SideBar = ({ showSidebar, setShowSidebar }) => {
  const depthLevel = 0;

//   const currentRole = "USER";
//   const menuItems = checkUserTypeMenuPermissions(routes, [currentRole], currentRole);
  const menuItems = routes;

  const sidebarDisplay = showSidebar ? "flex" : "none";
  const sidebarPosition = showSidebar ? "absolute" : "static";
  return (
    <List sx={{ display: { xs: sidebarDisplay, md: "flex" }, flexDirection: "column", justifyContent: "space-between", fontSize: "14px", minWidth: "240px", py: 0, position: { xs: sidebarPosition, md: "static" }, left: 0, top: 0, bgcolor: { xs: "secondary.main", md: "secondary.main" }, zIndex: 200, height: { xs: "100vh", md: "calc(100vh - 82px)" } }} >
      <Box sx={{ display: "flex", justifyContent: "center" }}><Typography>LOGO</Typography></Box>

      <Box sx={{ display: { xs: "block", md: "none" }, p: 3, bgcolor: "#FF7400" }} >
        <CloseIcon
          sx={{
            display: { xs: "block", md: "none" },
            color: "white.main",
            position: "absolute",
            right: "7%"
          }}
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        />
        {/* <Profile /> */}
        {/* <SwitchRoles /> */}
      </Box>
      <List sx={{ pl: 2, pr: 2, pt: 6, flexGrow: 1, overflowX: "hidden", overflowY: "auto" }} >
        {menuItems[1]?.children?.map((item, index) => {
          return item?.title ? (
            <DrawerMenu item={item} key={index} path="" depth={depthLevel} index={index} setShowSidebar={setShowSidebar} />
          ) : (
            <></>
          );
        })}
      </List>
    </List>
  );
};

export default SideBar;
