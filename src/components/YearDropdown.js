import React from "react";
import * as XLSX from "xlsx";
import axios from "axios";
const YearDropdown = () => {

  const year = new Date().getFullYear();
  let d = [];

  const handleFileChange = async (e) => {
    //the data is changing onchange no issue in the function

    try {
      const file = await e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
          );
          d = JSON.stringify(excelData);
          console.log(d);
          await axios
            .post("http://localhost:5000/savestudentsData", {
              year: year,
              dataarray: d,
            })
            .then((response) => {alert(response.data.message)})
            .catch((err) => {
              console.log(err);
            })
            
        };
        reader.readAsBinaryString(file);
      }
    } catch (err) {
      alert("internal server issue");
    }
  };

  return (
    <div>
      <label htmlFor="year">Upload student data of year:{year}</label>
      <br></br>
      <label htmlFor="file">Select a File:</label>
      <input
        type="file"
        id="file"
        accept=".xls, .xlsx"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default YearDropdown;
