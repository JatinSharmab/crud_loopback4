import { useState, useEffect, useRef } from "react";
import AgGrid from "components/common/AgGrid";
import { ColDef } from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import MyButton from "components/common/button";
import { useNavigate } from "react-router-dom";
import { fontGrid } from "@mui/material/styles/cssUtils";
import DeleteButton from "./delete_project";
import { AgGridReact } from "@ag-grid-community/react";
import UpdateProjects from "./update_projects";
import { stringify } from "querystring";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
  projectId: string;
  technology: string;
  project_name: string;
  status: string;
}

const ListUsers = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData, setRowData] = useState<IRow[]>([]);
  const navigate = useNavigate();

  function isForceRefreshSelected() {
    return (document.querySelector("#forceRefresh") as HTMLInputElement)
      .checked;
  }
  const handleEdit = (projectId: number) => {
    navigate(`/projects/update_projects/${projectId}`);
    console.log(projectId)
  };

  function isSuppressFlashSelected() {
    return (document.querySelector("#suppressFlash") as HTMLInputElement)
      .checked;
  }

  const test = (id: any) => {
    console.log("in test function");
    const newData = rowData.filter((project) => project.projectId != id);
    setRowData(newData);
    gridRef.current?.api.refreshCells({
      force: isForceRefreshSelected(),
      suppressFlash: isSuppressFlashSelected(),
    });
  };

  const handleDelete = () => {};

  const colDefs: ColDef<any>[] = [
    {
      field: "projectTech",
      headerName: "Technology",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "projectStatus",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },

    {
      field: "projectLead",
      headerName: "Project Lead",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "projectManager",
      headerName: "Project Manager",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "projectClient",
      headerName: "Project Client",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    // {
    //   field: "project_start_date",
    //   headerName: "Start Date",
    //   filter: true,
    //   floatingFilter: true,
    //   minWidth: 230,
    // },
    // {
    //   field: "project_deadline_date",
    //   headerName: "Project Deadline",
    //   filter: true,
    //   floatingFilter: true,
    //   minWidth: 230,
    // },
    {
      field: "managementTool",
      headerName: "Management Tool",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "managementUrl",
      headerName: "Management Tool Link",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "repoTool",
      headerName: "Repository Tool",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "repoUrl",
      headerName: "Repository Tool Link",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },
    {
      field: "projectDescription",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      minWidth: 230,
    },

    {
      headerName: "Actions",
      minWidth: 230,

      cellRenderer: (params: any) => (
        <div>
          <button
            style={{
              padding: 6,
              margin: 5,
              background: "#73CABE",
              color: "black",
            }}
            onClick={() => handleEdit(params.data.projectId)} 
          >
            Edit
          </button>

          {/* <button  ><UpdateProjects projectId={params.data.project_id}/> Edit</button> */}
          <DeleteButton
            projectId={params.data.projectId}
            fun={test.bind(this)}
          />
        </div>
      ),
    },
  ];

  const getToken = () => {
    return localStorage.getItem("Token");
  };

  const handleNavigateToAdd = () => {
    navigate("./add_projects");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:3001/projects/",
          {
            method: "GET",
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result.data.data)

        if (result.statusCode === 200) {
          // const projectData: any = result?.data;
          // console.log(projectData)
          const projectId = result.data.data.projectId;
          // JSON.stringify(projectId);
          console.log(projectId)
          // console.log(projectData[0]);
          setRowData(result.data.data.projects);
        } else {
          console.error("Unexpected data format:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MyButton
        // sx={}
        sx={{
          marginLeft: "1450px",
          marginBottom: "15px",
        }}
        type="submit"
        text="Add Projects"
        onClick={handleNavigateToAdd}
      />
      <AgGrid
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
      />
    </>
  );
};

export default ListUsers;
