import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import MultiSelect from  "react-multiple-select-dropdown-lite";
import  "react-multiple-select-dropdown-lite/dist/index.css"

import { useSearchParams, useNavigate } from "react-router-dom";

// Data

function MovieUpdate() {
  const [newName, setNewName] = useState("");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newYearID, setNewYearID] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [years, setYears] = useState([]);
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [professions, setProfessions] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleSynopsis = (e) => {
    setNewSynopsis(e.target.value);
  };

  const handleYear = (e) => {
    const id = years.find(y => y.yearNumber == e.target.value).id;
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
    fetch("http://localhost:64531/api/admin/Genres/GetAll")
      .then((response) => response.json())
      .then((d) => {
          setGenres(d);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim().length !== 0 && newSynopsis.trim().length !== 0) {
      const formData = new FormData();
      if (newYearID == -1) {
        setNewYearID(years[0].id);
      }
      if (selectedPeople.trim().length === 0) {
        console.log("You have to pick people.");
        return;
      }
     if (selectedGenres.trim().length === 0) {
        console.log("You have to pick people.");
        return;
      }

      const selectedGenreIDs = selectedGenres.split(",").map(p => genres.find(e => e.name == p).id);
      const selectedPeopleIDs = selectedPeople.split(",").map(p => people.find(e => e.name == p).id);


      console.log("dsa");
      for (const element of selectedGenreIDs) {
        formData.append("Genres", element);
      }
      for (const element of selectedPeopleIDs) {
        formData.append("People", element);
      }

      formData.append("PosterImage", posterImage);
      formData.append("BackgroundImage", backgroundImage);
      formData.append("Name", newName);
      formData.append("Synopsis", newSynopsis);
      formData.append("YearID", newYearID);
      formData.append("ID", id);
      const options = {
        method: "POST",
        body: formData,
      };

      fetch(`http://localhost:64531/api/admin/Movies/Update?id=${id}`, options)
        .then((response) => {
            console.log(response)
        if (response.status === 201) {
            navigate("/tables");
        }
      });
    }
  };



	const  handlePeople =  val  => {
		setSelectedPeople(val)
	};
  	const peopleOptions = people.map(p => {
        const professionObj = professions.find(profession => profession.id === p.professionID);
        return {
            label: `${p.name} (${professionObj !== undefined ? professionObj.name : ""})`,
            value: p.name
        }
    });

    const  handleGenres =  val  => {
        setSelectedGenres(val)
	};
  	const genreOptions = genres.map(p => {
        return {
            label: `${p.name}`,
            value: p.name
        }
    });

    console.log(newYearID);
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
                {selectedPeople}
            </div>

            <MultiSelect
                onChange={handlePeople}
                options={peopleOptions}
            />
        </div>

        <div>
            <div  className="preview-values">
                <h4>Genres</h4>
                {selectedGenres}
            </div>

            <MultiSelect
                onChange={handleGenres}
                options={genreOptions}
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
            <select onChange={handleYear} value={"haha"} id="years" name="years">
              {years.map(p => <option key={nanoid()} data-id={p.id} value={p.yearNumber}> {p.yearNumber} </option>)}
            </select> 
            <div>
                <h1>
                    Movie made in {years.find(y => y.id == newYearID) != undefined ? years.find(y => y.id == newYearID).yearNumber : ""}
                </h1>
            </div>
          </div>
        <button> Create </button>
      </form>
    </DashboardLayout>
  );
}

export default MovieUpdate;