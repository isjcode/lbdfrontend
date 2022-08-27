import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useState } from "react";

import { useLocation, useSearchParams, useNavigate} from "react-router-dom";

// Data

function ProfessionUpdate() {
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append('Authorization', "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length !== 0) {
      const sendData = {
        "id": id,
        "name": newName,

      };

      console.log(JSON.stringify(sendData));

      fetch(`api/admin/Professions/Update?id=${id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(sendData),
      })
        .then((response) => {
        if (response.status === 204) {
            navigate("/tables");
        }
          console.log(response);
      });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <label value="Name" htmlFor="new-name"> Name </label> 
        <input id="new-name" onChange={handleChange} value={newName}  placeholder="New name." /> 
        <button> Update </button>
      </form>
    </DashboardLayout>
  );
}

export default ProfessionUpdate;