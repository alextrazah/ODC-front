import React, { Component, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { queryServerApi } from "../utils/queryServerApi";
import "../App.css";
import jsPDF from "jspdf-autotable";

const Usedash = () => {
  const [error, setError] = useState({ visible: false, message: "" });
  const history = useHistory();

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
      } else history.push("/sign-in");
    },
  });
  const doc = new jsPDF();

  function down() {
    doc.autoTable({
      head: [["Name", "Lastname", "Email", "Password"]],
      body: [
        [
          localStorage.getItem("username"),
          localStorage.getItem("lastname"),
          localStorage.getItem("mail"),
          localStorage.getItem("pass"),
        ],
        // ...
      ],
    });

    doc.save("table.pdf");
  }

  return (
    <div class="containers">
      <br></br>
      <br></br>

      <br></br>

      <button
        onClick={() => {
          down();
        }}
        className="btn btn-dark btn-lg btn-block"
      >
        downloadpdf
      </button>
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
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">log in?</a>
        </p>
      </form>
    </div>
  );
};
export default Usedash;
