import { Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field } from "formik";


import { FORM_CONTROL_STYLE, useStyles } from "./style";
import TextError from "./TextError";

function Input(props) {
  const classes = useStyles();
  const { label, name, icons, startAdornment, onClick, sx = {}, errorName = "", statusError = false, onChangeText, onChangeFromController, digitsOnly = false, isMandatory = false, upperCase = false, id, ...rest } = props;
  return (
    <Grid sx={{ ...FORM_CONTROL_STYLE, ...sx }}>
      <InputLabel className={classes.label} htmlFor={name}>{label} {isMandatory && <span style={{ color: "red", fontSize: "12px" }}> *</span>}</InputLabel>
      <Field name={name} >
        {({ form, field }) => {
          const { handleChange } = form;
          const customHandleChange = (e) => {
            onChangeText && onChangeText(e.target.value);
            const regex = /^[0-9\b]+$/;
            if (!digitsOnly) {
              handleChange(e);
            }
            if (digitsOnly && e.target.value === "" || regex.test(e.target.value.toLowerCase())) {
              handleChange(e);
            } else if (upperCase) {
              e.target.value = e.target.value.toUpperCase();
              handleChange(e);
            }
          };
          onChangeFromController && onChangeFromController(form.values[name]);
          return (
            <>
              <TextField
                id={`textfield-${id}`}
                name={name}
                {...field}
                {...rest}
                size="small"
                onChange={customHandleChange}
                autoComplete="new-password"
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#5A5A5A"
                  }
                }}
                InputProps={{
                  startAdornment: (startAdornment),
                  endAdornment: (
                    <InputAdornment position="end">
                      {icons && <IconButton onClick={onClick} edge="end"> {icons}</IconButton>}
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.toolbarText
                  }
                }}
              />
              {statusError ? <Typography variant="p" sx={{ color: "red", mt: 1, lineHeight: "0px", fontSize: "14px" }}>{errorName}</Typography> :
                <ErrorMessage component={TextError} name={name} />}
            </>
          );
        }}
      </Field>
    </Grid>
  );
}

export default Input;
