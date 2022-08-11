/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";

import { useLocation, useSearchParams, useNavigate} from "react-router-dom";

// Data

function PersonCreate() {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newProfessionID, setNewProfessionID] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);


  const [professions, setProfessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:64531/api/admin/Professions/GetAll")
      .then((response) => response.json())
      .then((d) => {
        setProfessions(d);
        setNewProfessionID(d[0].id);
      });
  }, []);

  const handleName = (e) => {
    setNewName(e.target.value);
  };
  const handleDescription = (e) => {
    setNewDescription(e.target.value);
  };

  const handleSelect = (e) => {
    const id = professions.find(a => a.name === e.target.value).id;
    setNewProfessionID(id);
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const id = searchParams.get("id");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length !== 0 && newDescription.trim().length !== 0) {
      const formData = new FormData();
      if (newProfessionID == -1) {
        setNewProfessionID(professions[0].id);
      }
      formData.append("File", selectedImage);
      formData.append("Name", newName);
      formData.append("Description", newDescription);
      formData.append("ProfessionID", newProfessionID);
      const options = {
        method: "PUT",
        body: formData,
      };

      fetch("http://localhost:64531/api/admin/People/Create", options)
        .then((response) => {
          if (response.status === 201) {
            navigate("/tables");
        }
      });
    }
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label value="Name" htmlFor="new-name"> Name </label> 
          <input id="new-name" onChange={handleName} value={newName}  placeholder="New name." /> 
        </div>
        <div>
          <label value="Description" htmlFor="new-description"> Description </label> 
          <input id="new-description" onChange={handleDescription} value={newDescription} />
        </div>
        <div>
          <label> Image 
              <input onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
                type="file" name="myImage" accept="image/jpeg" />
          </label>
        </div>
        <div>
           <label htmlFor="professions">Choose a profession:</label>
            <select onChange={handleSelect} value={newProfessionID} id="professions" name="professions">
              {professions.map(p => <option data-id={p.id} value={p.name}> {p.name} </option>)}
            </select> 
          </div>
        <button> Create </button>
      </form>
    </DashboardLayout>
  );
}

export default PersonCreate;