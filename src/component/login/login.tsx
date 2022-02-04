import { Button, FormControl, FormGroup, FormLabel, Grid, Link, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FormikErrors, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReducerAppType } from "../../redux/store";
import { loginUser, userType } from "../../redux/userReducer";
import Preloader from "../preloader/preloader";
import styles from "./login.module.scss";

export type valuesErrorsType = {email: string, password: string}
const LoginPage = ()=>{

  const history = useHistory();
  const isLoading = useSelector<ReducerAppType, boolean>((state) => state.user.isLoading);
  const user = useSelector<ReducerAppType, userType>((state)=> state.user.user)
  const error = useSelector<ReducerAppType, string>((state)=> state.user.error)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) {
        history.goBack();
    }
}, [user, history]);
 
  const formik = useFormik({
      initialValues: {
          email: "",
          password: "",
      },
      onSubmit: (values) => {
          dispatch(loginUser(values.email, values.password));
      },

      validate: (values) => {
          const errors: FormikErrors<valuesErrorsType> = {};
          if (!values.email) {
              errors.email = "Email is required";
          } else if (!values.password) {
              errors.password = "password is required";
          }
          return errors;
      },
  });

  return (
      <>
          {isLoading ? (
              <Preloader />
          ) : (
              <div className={styles.loginContainer}>
                  <Grid container justifyContent="center">
                      <Grid item xs={4}>
                          <form onSubmit={formik.handleSubmit}>
                              <FormControl>
                                  <FormLabel className={styles.formlabel}>
                                  Введите логин и пароль   
                                  </FormLabel>
                                  <FormGroup>
                                      <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                                      {formik.errors.email && (
                                          <div className={styles.errorField}>{formik.errors.email}</div>
                                      )}
                                      <TextField
                                          label="Password"
                                          margin="normal"
                                          type="password"
                                          {...formik.getFieldProps("password")}
                                      />
                                      {formik.errors.password && (
                                          <div className={styles.errorField}>{formik.errors.password}</div>
                                      )}
                                      <Button type={"submit"} className={styles.button}>
                                         логин
                                      </Button>
                                      <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                        history.push('/registration');
                                    }}
                    >
                        Страница регистрации
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


export default  LoginPage