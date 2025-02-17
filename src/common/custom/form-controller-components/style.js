const { makeStyles } = require("@mui/styles");

export const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
     border: "1px solid #CDCDCD"
  },
  toolbarText: {
    fontSize: "14px",
    height: "20px",
    fontFamily: "Helvetica"
  },
  label: {
    fontSize: "14px",
    lineHeight: "normal",
    fontStyle: "normal",
    fontFamily: "Helvetica",
    fontWeight: 400,
    color: "#000"
  },
  "@media (min-width: 900px)": {
    toolbarText: {
      height: "33px",
      fontFamily: "Helvetica"
    },
    label: {
      fontSize: "14px",
      marginBottom: "5px"
    }
  },
  rmsc: {
    "--rmsc-main": "#FF7400",
    "--rmsc-hover": "#F1F3F5",
    "--rmsc-selected": "#E2E6EA",
    "--rmsc-border": "#CDCDCD",
    "--rmsc-gray": "#aaa",
    "--rmsc-bg": "#fff",
    "--rmsc-p": "10px",
    "--rmsc-radius": "10px",
    "--rmsc-h": "48px",
    "&:hover": {
      "--rmsc-border": "rgb(255, 116, 0)"
    }
  }
});

export const FORM_CONTROL_STYLE = { display: "flex", flexDirection: "column", position: "relative", pb: { xs: 0, md: 1.5 } };
