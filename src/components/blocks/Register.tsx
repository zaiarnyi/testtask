import React from "react";
import { useFormik } from "formik";
import { hideLongContacts } from "./elements/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";
import { Loading } from "./elements/Loading";
import * as Yup from "yup";
// import { thunkAddPersonForStaff } from "../Redux/userReducer";
import { IPositions } from "../Redux/PositionReducer";
import cats from "../../assets/img/cat-paws.svg";
import { thunkSetRegisterPerson } from "../Redux/userReducer";

export interface IInitValueReg {
  name: string;
  email: string;
  phone: string;
  position_id: string;
  file: any;
}
export interface IAddPerson extends IInitValueReg {
  position: string;
}
interface IRegisterProp {}

const customClass = (length: string, err: string | undefined): string => {
  const classes = ["form-register__input"];
  if (length.length > 0) {
    classes.push("empty");
  }
  if (err) {
    classes.push("error");
  }
  return classes.join(" ");
};
const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      "Email is not valid"
    )
    .required("Required"),
  phone: Yup.string()
    .matches(/^[\+]{0,1}380([0-9]{9})$/, "Phone number is not valid")
    .required("Required"),
  position_id: Yup.string().min(1, "Select a position!").required("Required"),
  file: Yup.mixed()
    .required("A file is required")
    .test("fileFormat", "jpeg/jpg", (value) => {
      return value && ["image/jpg", "image/jpeg"].includes(value.type);
    })
    .test("fileFormat", "Uploaded file is too big.", (value) => {
      return value && +(value.size * 0.000001).toFixed(2) <= 5;
    }),
});

export const Register: React.FC<IRegisterProp> = (props) => {
  const positionsState = useSelector((state: AppStateType) => state.position);
  const tokenApi = useSelector((state: AppStateType) => state.app.token);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "",
      file: null,
    } as IInitValueReg,
    validationSchema: signupSchema,
    onSubmit: (values, formikHelpers) => {
      const link =
          "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("position_id", values.position_id);
      formData.append("photo", values.file);
      const checkPosition: IPositions[] = positionsState.positions.filter(
          (item) => +formik.values.position_id === item.id
        ),
        newValue: IAddPerson = {
          ...values,
          position: checkPosition[0].name,
        };
      dispatch(thunkSetRegisterPerson(link, formData, tokenApi));
      formikHelpers.setSubmitting(true);
      formikHelpers.resetForm();
    },
  });
  return (
    <section className={"register"}>
      <div className="register__container container">
        <div className="register__top">
          <div className="register__title title">Register to get a work</div>
          <div className="register__subtitle subtitle">
            Your personal data is stored according to the Privacy Policy
          </div>
        </div>
        <div className="register__body">
          <form className={"form-register"} onSubmit={formik.handleSubmit}>
            <div className="form-register__info">
              <div className="form-register__row">
                <input
                  type="text"
                  name={"name"}
                  id={"name"}
                  value={formik.values.name}
                  className={customClass(
                    formik.values.name,
                    formik.errors.name
                  )}
                  autoComplete={"off"}
                  placeholder={"Placeholder"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="name" className={"form-register__label"}>
                  Your name
                </label>
                <div className={"form-register__helper"}>
                  <span className={"form-register__helper-text"}>
                    {!formik.errors.name ? "helper text" : formik.errors.name}
                  </span>
                  <span className={"form-register__helper-count"}>
                    {formik.values.name.length} / n
                  </span>
                </div>
              </div>
              <div className="form-register__row">
                <input
                  type="text"
                  name={"email"}
                  id={"email"}
                  value={formik.values.email}
                  className={customClass(
                    formik.values.email,
                    formik.errors.email
                  )}
                  autoComplete={"off"}
                  placeholder={"Placeholder"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="email" className={"form-register__label"}>
                  Email
                </label>
                <div className={"form-register__helper"}>
                  <span className={"form-register__helper-text"}>
                    {!formik.errors.email ? "helper text" : formik.errors.email}
                  </span>
                  <span className={"form-register__helper-count"}>
                    {formik.values.email.length} / n
                  </span>
                </div>
              </div>
              <div className="form-register__row">
                <input
                  type="text"
                  name={"phone"}
                  id={"phone"}
                  value={formik.values.phone}
                  className={customClass(
                    formik.values.phone,
                    formik.errors.phone
                  )}
                  autoComplete={"off"}
                  placeholder={"Placeholder"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="phone" className={"form-register__label"}>
                  Phone
                </label>
                <div className={"form-register__helper"}>
                  <span className={"form-register__helper-text"}>
                    {!formik.errors.phone ? "helper text" : formik.errors.phone}
                  </span>
                  <span className={"form-register__helper-count"}>
                    {formik.values.phone.length} / n
                  </span>
                </div>
              </div>
            </div>
            {positionsState.isLoadingPosition ? (
              <div className="form-register__select">
                <div className={"form-register__label-select"}>
                  Select your position
                </div>
                {positionsState.positions.map((item, i) => (
                  <div className="form-register__radio" key={item.name}>
                    <input
                      id={`radio-${i}`}
                      type="radio"
                      name="position_id"
                      value={item.id}
                      className={"form-register__radio-input"}
                      onChange={formik.handleChange}
                      checked={+formik.values.position_id === item.id}
                    />
                    <label
                      htmlFor={`radio-${i}`}
                      className={"form-register__radio-label"}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <Loading />
            )}
            <div className="form-register__upload">
              <input
                type="file"
                name="file"
                id="file-1"
                accept="image/jpg,image/jpeg"
                className={
                  !formik.errors.file
                    ? "form-register__file"
                    : "form-register__file error"
                }
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    formik.setFieldValue("file", e.currentTarget.files[0]);
                  }
                }}
              />
              <label className="form-register__file-wrapper" htmlFor="file-1">
                <div className="form-register__file-button">Upload</div>
                <div className="form-register__file-fake">
                  {!formik.values.file
                    ? "Upload your photo"
                    : hideLongContacts(formik.values.file.name.split(".")[0])}
                </div>
              </label>
              <div className={"form-register__helper"}>
                <span className={"form-register__helper-text"}>
                  {formik.errors.file}
                </span>
              </div>
            </div>
            <div className="form-register__button">
              <button
                type={"submit"}
                className={"btn"}
                disabled={!(formik.isValid && formik.dirty)}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={"register__bg"}>
        <img src={cats} alt="" />
      </div>
    </section>
  );
};
