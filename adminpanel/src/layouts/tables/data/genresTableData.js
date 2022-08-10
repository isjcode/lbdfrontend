/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, createSearchParams } from "react-router-dom";
import { doc } from "prettier";

export default function data() {
  const Genre = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const [genres, setGenres] = useState(null);

  useEffect(() => {
    placeGenres();
  }, []);

  const placeGenres = () => {
    fetch("http://localhost:64531/api/admin/Genres/GetAll")
      .then((response) => response.json())
      .then((d) => {
        setGenres(d);
      });
  };

  const navigate = useNavigate(); 
  const routeChange = (e) => { 
    const id = e.target.dataset.id;
    const params = { id: id };
    const path = `/CRUD/genre/genreupdate`;
    navigate({
      pathname: path,
      search: `?${createSearchParams(params)}`,
    });
  };

  const deleteOrRestore = (id) => {
    fetch(`http://localhost:64531/api/admin/Genres/DeleteOrRestore?id=${id}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.status == 200) {
          navigate("/tables");
        }
      })
      .then(() => {
        placeGenres();
      });
  };

  const rows = [];

  if (genres) {
    genres.forEach((element) => {
      rows.push({
        genre: <Genre name={element.name}/>,
        status: (
          <MDTypography onClick={() => deleteOrRestore(element.id)} component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <MDBadge badgeContent={element.isDeleted ? "Restore" : "Delete"} color={!element.isDeleted ? "error" : "success"} variant="gradient" size="sm" />
          </MDTypography>
        ),
        action: (
          <MDTypography onClick={routeChange} data-id={element.id} component="a" className="edit" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      });
    });
  }
  return {
    columns: [
      { Header: "genre", accessor: "genre", width: "45%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows
  };
}
