import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import "../material.css";

interface Props {
  nextStep: () => void;
}

const RegisterFirstStepForm = (props: Props) => {
  const navigate = useNavigate();

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "*Required";
    } else if (values.length < 8 && values.length > 50) {
      errors.password = "*Password must be between 8 and 50 characters long.";
    }

    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password not matched";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      try {
        const result = await authService
          .register(values.email, values.password, values.confirmPassword)
          .then(async () => {
            await authService.login(values.email, values.password);
            props.nextStep();
          });
      } catch (e) {
        alert(e);
      }
    },
  });

  const borderColor = "rgba(0, 0, 0, 0.23);";

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          focused
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <TextField
          id="password"
          label="Придумайте пароль"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <TextField
          id="confirmPassword"
          label="Придумайте пароль"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
        <div className="policy">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          ></Checkbox>
          <p className="policy-text">
            Я прочитал(а) и принимаю{" "}
            <span className="policy-link">
              Условия использования и Политику конфиденциальности
            </span>
          </p>
        </div>
        <button className="app-btn" type="submit" disabled>
          Подтвердить
        </button>
      </form>
    </>
  );
};

export default RegisterFirstStepForm;

{
  /* <TextField
        helperText="Please enter your name"
        id="demo-helper-text-misaligned"
        label="Name"
      />
      <TextField id="demo-helper-text-misaligned-no-helper" label="Name" /> */
}

// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "green",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "green",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "red",
//     },
//     "&:hover fieldset": {
//       borderColor: "yellow",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "green",
//     },
//   },
// });

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: theme.spacing(3),
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     width: "auto",
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// const RedditTextField = styled((props: TextFieldProps) => (
//   <TextField
//     InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiFilledInput-root": {
//     border: "1px solid #e2e2e1",
//     overflow: "hidden",
//     borderRadius: 4,
//     backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),
//     "&:hover": {
//       backgroundColor: "transparent",
//     },
//     "&.Mui-focused": {
//       backgroundColor: "transparent",
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// const ValidationTextField = styled(TextField)({
//   "& input:valid + fieldset": {
//     borderColor: "green",
//     borderWidth: 2,
//   },
//   "& input:invalid + fieldset": {
//     borderColor: "red",
//     borderWidth: 2,
//   },
//   "& input:valid:focus + fieldset": {
//     borderLeftWidth: 6,
//     padding: "4px !important", // override inline-style
//   },
// });
