import React, { useState, Fragment } from "react";
 
 
import GroupInfo from "./GroupInfo";
import Table from "../../data/Table";

function CreateGruops() {
    const [tableData, setTableData] = useState([]);
  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    profile: "",
  });

  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    setFormObject(value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      const dataObj = (data) => [...data, formObject];
      setTableData(dataObj);
      const isEmpty = { name: "", email: "", profile: "" };
      setFormObject(isEmpty);
    }
  };
  return (
    <div>
    <section
      class="p-5 w-100"
      style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
    >
      <div class="row">
      <div class="col-1"> </div>
        <div class="col-10">
          <div class="card text-black" style={{ borderRadius: "25px" }}>
            <div class="card-body p-md-5">

    <Fragment>
        <h5 style={{color:"#88BDAE"}}> Create Group</h5>  
      <GroupInfo
        onValChange={onValChange}
        formObject={formObject}
        onFormSubmit={onFormSubmit}
      />
      <Table tableData={tableData} />
    </Fragment>


     
    </div>
            </div>
          </div>
          <div class="col-1"> </div>
        </div>
      </section>
    </div>
  )
}

export default CreateGruops