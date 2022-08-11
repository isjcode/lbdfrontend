import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MultiSelect from  "react-multiple-select-dropdown-lite";
import  "react-multiple-select-dropdown-lite/dist/index.css"

import { useSearchParams, useNavigate } from "react-router-dom";

// Data

function MovieCreate() {
  const [newName, setNewName] = useState("");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newYearID, setNewYearID] = useState(-1);
  const [posterImage, setPosterImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [years, setYears] = useState([]);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [professions, setProfessions] = useState([]);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleSynopsis = (e) => {
    setNewSynopsis(e.target.value);
  };

  const handleYear = (e) => {
    const id = years.find(a => a.name === e.target.value).id;
    setNewYearID(id);
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const id = searchParams.get("id");
  useEffect(() => {
    fetch("http://localhost:64531/api/admin/Movies/GetYears")
    .then((response) => response.json())
    .then((d) => {
        setYears(d);
        setNewYearID(d[0].id);
    });
    fetch("http://localhost:64531/api/admin/People/GetAll")
    .then((response) => response.json())
    .then((d) => {
        setPeople(d);
    });
    fetch("http://localhost:64531/api/admin/Professions/GetAll")
        .then((response) => response.json())
        .then((d) => {
            setProfessions(d);
    });


  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length !== 0 && newSynopsis.trim().length !== 0) {
      const formData = new FormData();
      if (newYearID == -1) {
        setNewYearID(years[0].id);
      }
      formData.append("PosterImage", posterImage);
      formData.append("BackgroundImage", backgroundImage);
      formData.append("Name", newName);
      formData.append("Synopsis", newSynopsis);
      formData.append("YearID", newYearID);
      const options = {
        method: "PUT",
        body: formData,
      };

      fetch("http://localhost:64531/api/admin/Movies/Create", options)
        .then((response) => {
        if (response.status === 201) {
            navigate("/tables");
        }
      });
    }
  };


	const [value, setvalue] = useState('')

	const  handlePeople =  val  => {
		setPerson(val)
	}
  	const peopleOptions = people.map(p => {
        const professionObj = professions.find(profession => profession.id === p.professionID);
        return {
            label: `${p.name} (${professionObj !== undefined ? professionObj.name : ""})`,
            value: p.name
        }
    });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label value="Name" htmlFor="new-name"> Name </label> 
          <input id="new-name" onChange={handleName} value={newName}  placeholder="New name." /> 
        </div>
        <div>
            <label value="Synopsis" htmlFor="new-synopsis"> Synopsis </label> 
            <input id="new-synopsis" onChange={handleSynopsis} value={newSynopsis} />
        </div>
        <div>
            <div  className="preview-values">
                    <h4>People</h4>
                    {person}
            </div>

            <MultiSelect
                onChange={handlePeople}
                options={peopleOptions}
            />
        </div>
        <div>
          <label> PosterImage 
              <input onChange={(event) => {
                console.log(event.target.files[0]);
                setPosterImage(event.target.files[0]);
              }}
                type="file" name="posterImage" accept="image/jpeg" />
          </label>
        </div>
        <div>
        <label> BackgroundImage 
            <input onChange={(event) => {
                console.log(event.target.files[0]);
                setBackgroundImage(event.target.files[0]);
              }}
                type="file" name="posterImage" accept="image/jpeg" />
          </label>
        </div>
        <div>
           <label htmlFor="years">Choose a year:</label>
            <select onChange={handleYear} value={newYearID} id="years" name="years">
              {years.map(p => <option key={nanoid()} data-li={p.id} value={p.yearNumber}> {p.yearNumber} </option>)}
            </select> 
          </div>
        <button> Create </button>
      </form>
    </DashboardLayout>
  );
}

export default MovieCreate;