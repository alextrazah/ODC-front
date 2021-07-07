import React, { useState } from "react";
import * as XLSX from "xlsx";
import { queryServerApi } from "../utils/queryServerApi";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
    };
  }
  handleClick(e) {
    this.refs.fileUploader.click();
  }
  submit() {
    const data = new FormData();

    data.append("test", "file");
    let url = "http://localhost:3000/users/addxl55";

    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.warn(res);
      });
  }
  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(this.convertToJson(data));
      const jit = this.convertToJson(data);
      this.values(jit);
      // If property names are known beforehand, you can also just do e.g.
      // alert(object.id + ',' + object.Title);
    };
    reader.readAsBinaryString(f);
  }
  go = async (id, email, nom, prenom, pass) => {
    console.log(id * 1000);
    try {
      await this.timeout(id * 1000);

      const userPosts = await axios.post(
        "http://localhost:3000/users/addxl/" +
          email +
          "/" +
          nom +
          "/" +
          prenom +
          "/" +
          pass
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  values(val) {
    var myObject = JSON.parse(val);

    return (
      <div>
        <div>
          {myObject
            ? myObject.map((row) => (
                <div key={row.name}>
                  <span align="right">{console.log(row.Firstname)}</span>
                  <span align="right">{console.log(row.Email)}</span>
                  <span align="right">{console.log(row.Password)}</span>
                  {this.go(
                    row.id,
                    row.Email,
                    row.Firstname,
                    row.Lastname,
                    row.Password
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
  render() {
    return (
      <div>
        <input
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        />
        <button
          onClick={() => {
            this.readFile();
          }}
        >
          Read File
        </button>
      </div>
    );
  }
}

export default ExcelToJson;
