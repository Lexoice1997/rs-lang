import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Link, TextField } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { FormikErrors, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducerAppType } from "../../redux/store";
import { createNewUser, userType } from "../../redux/userReducer";
import Preloader from "../preloader/preloader";
import styles from "./regestration.module.scss";

export type valuesErrorsType = {name: string, email: string, password: string}
const RegistrationPage = ()=>{

    const history = useHistory();
    const isLoading = useSelector<ReducerAppType, boolean>((state) => state.user.isLoading)
    const user = useSelector<ReducerAppType, userType>((state)=> state.user.user)
    const error = useSelector<ReducerAppType, string>((state)=> state.user.error)

   const dispatch = useDispatch();
    useEffect(() => {
    if (user?.email) {
        history.replace('/login');
    }
    }, [user, history]);
 

  const formik = useFormik({
      initialValues: {
          name: "",
          email: "",
          password: "",
      },
      onSubmit: (values) => {
          dispatch(createNewUser(values.name, values.email, values.password));
      },



      validate: (values) => {
          const errors:FormikErrors <valuesErrorsType> = {};

          if (!values.name) {
              errors.name = "Enter your login";
          } else if (!values.email) {
              errors.email = "Email is required";
          } else if (!/^[A-Z0-8._%+-]+@[A-Z0-8.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              /*the address must contain the @ dot character and at least 2 domain letters after the dot*/
              errors.email = "Invalid email address";
          } else if (!values.password) {
              errors.password = "password is required";
          }  
          return errors;
      },
  });
  return (
      <>
      
          {isLoading ? (
              <div>
                  <Preloader />
              </div>
          ) : (
              <div className={styles.regestrationContainer}>
                  <Grid container justifyContent="center">
                      <Grid item xs={4}>
                          <form onSubmit={formik.handleSubmit}>
                              <FormControl>
                                  <FormLabel className={styles.formlabel}>
                                  Пожалуйста зарегестрируйтесь, введите свое имя, адрес электронной почты и пароль
                                  </FormLabel>
                                  <FormGroup>
                                      <TextField
                                          id="name"
                                          label="Name"
                                          margin="normal"
                                          {...formik.getFieldProps("name")}
                                      />
                                      {formik.touched.name && formik.dirty && formik.errors.name && (
                                          <div className={styles.errorField}>{formik.errors.name}</div>
                                      )}
                                      <TextField
                                          id="email"
                                          label="Email"
                                          margin="normal"
                                          {...formik.getFieldProps("email")}
                                      />
                                      {formik.touched.email && formik.dirty && formik.errors.email && (
                                          <div className={styles.errorField}>{formik.errors.email}</div>
                                      )}
                                      <TextField
                                          label="Password"
                                          margin="normal"
                                          type="password"
                                          id="password"
                                          {...formik.getFieldProps("password")}
                                      />
                                      {formik.touched.password && formik.dirty && formik.errors.password && (
                                          <div className={styles.errorField}>{formik.errors.password}</div>
                                      )}
                                      <Button type={"submit"} className={styles.button} >
                                          регистрация
                                      </Button>
                                      <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                        history.push('/login');
                                    }}
                                    >
                                     Страница логина
                                    </Link>
                                    {error && <Alert severity="error">{error}</Alert>}
                                  </FormGroup>
                              </FormControl>
                          </form>
                      </Grid>
                  </Grid>
              </div>
          )}
      </>
  );
};


export default  RegistrationPage