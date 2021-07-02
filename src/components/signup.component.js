import React, { Component, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { queryServerApi } from "../utils/queryServerApi";
const Register = () => {
  const [values, setValues] = React.useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    Password: "",
    Role: "DRE",
  });
  const history = useHistory();

  const [error, setError] = useState({ visible: false, message: "" });

  const formik = useFormik({
    initialValues: {
      registrationNumber: "",
      model: "",
      driver: "",
      weightCapacity: 0,
      trunkVolume: 0,
      weightLeft: 0,
      volumeLeft: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      const [, err] = await queryServerApi(
        "users/adduser",
        values,
        "POST",
        false
      );
      if (err) {
        setError({
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        });
      } else history.push("/sign-in");
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const options = [
    { value: "DRE", label: "DRE" },
    { value: "DRS", label: "DRS" },
    { value: "DSI", label: "DSI" },
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Register</h3>
      <div className="form-group">
        <label>First name</label>

        <input
          name="Firstname"
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          placeholder="Firstname"
        />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          name="Lastname"
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          placeholder="Last name"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="Email"
          onChange={formik.handleChange}
          className="form-control"
          type="Email"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          name="Password"
          onChange={formik.handleChange}
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Direction</label>
        <select
          className="form-control"
          name="Role"
          onChange={formik.handleChange}
        >
          <option name="Role" onChange={formik.handleChange} value="DRE">
            DRE
          </option>
          <option name="Role" onChange={formik.handleChange} value="DRS">
            DRS
          </option>
          <option name="Role" onChange={formik.handleChange} value="DSI">
            DSI
          </option>
        </select>
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">
        Register
      </button>
      <p className="forgot-password text-right">
        Already registered <a href="#">log in?</a>
      </p>
    </form>
  );
};
export default Register;
