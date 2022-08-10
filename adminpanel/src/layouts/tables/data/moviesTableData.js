import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, createSearchParams } from "react-router-dom";
import { doc } from "prettier";

export default function data() {
    const Person = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    placeMovies();
    fetch(`http://localhost:64531/api/admin/Movies/GetAll`)
      .then((response) => response.json())
      .then((d) => {
        setMovies(d);
      });
  }, []);

  const placeMovies = () => {
    fetch("http://localhost:64531/api/admin/Movies/GetAll")
      .then((response) => response.json())
      .then((d) => setMovies(d));
  };

  const navigate = useNavigate();
  const routeChange = (e) => { 
    const id = e.target.dataset.id;
    const params = { id: id };
    const path = `/CRUD/person/personupdate`;
    navigate({
      pathname: path,
      search: `?${createSearchParams(params)}`,
    });
  };

  const deleteOrRestore = (id) => {
    fetch(`http://localhost:64531/api/admin/People/DeleteOrRestore?id=${id}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.status == 200) {
          navigate("/tables");
        }
        console.log(response);
      })
      .then(() => {
        placeMovies();
      });
  };
  const rows = [];
  if (movies) {
    movies.forEach((element) => {
      rows.push({
        person: <Person  image={require(`assets/images/${element.posterImage}`)}  name={element.name} />,

        status: (
          <MDTypography onClick={() => deleteOrRestore(element.id)} component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <MDBadge badgeContent={element.isDeleted ? "Restore" : "Delete"} color={!element.isDeleted ? "error" : "success"} variant="gradient" size="sm" />
          </MDTypography>
        ),
        action: (
          <MDTypography  onClick={routeChange} data-id={element.id} component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      });
    });
  }

  return {
    columns: [
      { Header: "person", accessor: "person", width: "45%", align: "left" },
      { Header: "profession", accessor: "profession", width: "20%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows
  };
}
