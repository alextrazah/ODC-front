import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { queryServerApi } from "../utils/queryServerApi";

const Dash = () => {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [file, setfile] = useState();

  const [sig, setsig] = useState();

  const classes = useStyles();

  useEffect(() => {
    getsign();

    const interval = setInterval(() => {
      getsign();
    }, 400000);

    return () => clearInterval(interval);
  }, []);
  const getsign = async () => {
    try {
      const userPosts = await axios.get("http://localhost:3000/users/usersAll");

      setsig(userPosts.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const des = async (id) => {
    const [res, err] = await queryServerApi(
      "users/dell/" + id,
      null,
      "PUT",
      false
    );
  };

  function go(id) {
    console.log(id);
    const goit = async () => {
      try {
        const userPosts = await axios.put(
          "http://localhost:3000/users/dell/" + id
        );
      } catch (err) {
        console.error(err.message);
      }
    };
  }
  function handleInputChange(event) {
    setfile({
      selectedFile: event.target.files[0],
    });
  }

  function submit() {
    const data = new FormData();
    data.append("file", file);
    data.append("test", "file");
    console.warn(file);
    let url = "http://localhost:3000/users/addxl";

    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.warn(res);
      });
  }
  return (
    <div class="w3-container">
      <br></br> <br></br> <br></br>{" "}
      <div className="form-row">
        <div className="form-group col-md-6"></div>
        <div className="form-row">
          <label className="text-white">Select File :</label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            Save
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">nom</TableCell>
              <TableCell align="right">prenom</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">Direction</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sig
              ? sig.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">{row.Firstname}</TableCell>
                    <TableCell align="right">{row.Lastname}</TableCell>
                    <TableCell align="right">{row.Email}</TableCell>
                    <TableCell color="blue">{row.Role}</TableCell>
                    <TableCell>
                      {row.Role != "Admin" && row.Active == 1 && (
                        <button
                          onClick={() => {
                            des(row._id);
                          }}
                          className="btn btn-dark btn-lg btn-block"
                        >
                          Supprimer
                        </button>
                      )}{" "}
                      {row.Role != "Admin" && row.Active == 0 && (
                        <button className=" btn-lg btn-block">Desactivé</button>
                      )}{" "}
                      {row.Role === "Admin" && (
                        <button className=" btn-lg btn-block">Admin</button>
                      )}{" "}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Dash;
