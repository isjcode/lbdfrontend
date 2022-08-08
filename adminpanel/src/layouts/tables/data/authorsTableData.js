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
    fetch("http://localhost:64531/api/Genres")
      .then((response) => response.json())
      .then((d) => setGenres(d));
  }, []);

  const rows = [];

  if (genres) {
    genres.forEach((element) => {
      rows.push({
        genre: <Genre name={element.name}/>,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={element.isDeleted ? "Deleted" : "Not Deleted"} color={element.isDeleted ? "error" : "success"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" className="edit" href={`/genres/update/${element.id}`} variant="caption" color="text" fontWeight="medium">
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
    // rows: [
      //   genre: <Genre name="Hi Michael" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
    // ],

  };
}
