import React, { Component, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { queryServerApi } from "../utils/queryServerApi";
import "../App.css";
import Pdf from "react-to-pdf";

const Usedash = () => {
  const [error, setError] = useState({ visible: false, message: "" });
  const history = useHistory();
  const ref = React.createRef();

  const formik = useFormik({
    initialValues: {
      Firstname: localStorage.getItem("username"),
      Lastname: localStorage.getItem("lastname"),
      Email: localStorage.getItem("mail"),
      Password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const [, err] = await queryServerApi(
        "users/putuser/" + localStorage.getItem("id"),
        values,
        "PUT",
        false
      );
      if (err) {
        setError({
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        });
      }
    },
  });

  return (
    <div class="containers">
      <br></br>
      <br></br>

      <br></br>
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>

      <table ref={ref}>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
        <tr>
          <td>{localStorage.getItem("username")}</td>
          <td>{localStorage.getItem("lastname")}</td>
          <td>{localStorage.getItem("mail")}</td>
          <td>crypted</td>
          <td>{localStorage.getItem("role")}</td>
        </tr>
      </table>

      <form onSubmit={formik.handleSubmit}>
        <h3>Edit account</h3>
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
          Edit
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">log in?</a>
        </p>
      </form>
    </div>
  );
};
export default Usedash;
