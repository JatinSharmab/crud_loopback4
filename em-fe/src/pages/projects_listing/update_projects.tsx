import {
  Box,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import DynamicSelect from "components/common/select";
import MyInput from "components/common/myInput";

const UpdateProjects = (): ReactElement => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({});
  const [success, setSuccess] = useState<boolean>(false);
  const formatDateForDisplay = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  const formatDateForBackend = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
  
  
  // console.log("this is fisrt",projectId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  useEffect(() => {
    getProjectData(projectId);
  }, []);

  const getProjectData = async (id: any) => {
    // console.log(id,'idddddddddddddddddddddddddddddd')
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://127.0.0.1:3001/project/${id}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, 
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUserData(result?.data.data);
        
        reset(result?.user); 
         console.log(result.data.data);
         

      } else {
        console.error("Failed to fetch project data");
      }
    } catch (error: any) {
      console.error("Error fetching project data:", error.message);
    }
  };

  const onSubmitProfileUpdate = async (data: any) => {
    console.log(projectId)
    try {
      const token = localStorage.getItem("Token");
      const response = await fetch(
        `http://127.0.0.1:3001/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      // const result = await response.json();

      if (response) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/projects");
        }, 100);
      } else {
        setError("server", {
          message: "Failed to update project. Please try again.",
        });
      }
    } catch (error: any) {
      setError("server", { message: error.message });
    }
  };

  return (
    <Box
      className="main"
      sx={{
        width: "90vw",
        minHeight: "50vh",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box component="figure" mb={5} mx="auto" textAlign="center" width="100%">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper
        sx={{
          width: "100%",
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Stack justifyContent="center" gap={5} width="100%">
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Update Project Information
          </Typography>

          <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
            
            <TextField
              label="Project Name"
              type="text"
              placeholder="Enter Project Name"
              value={userData.projectName || ""}
              {...register("projectName", {
                required: "Project Name is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectName: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectName}
              helperText={
                errors.projectName ? String(errors.projectName.message) : ""
              }
            />
            <TextField
              label="Technology"
              type="text"
              placeholder="Enter Technology"
              value={userData.projectTech||" "}
              {...register("projectTechnology", {
                required: "Technology is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectTechnology: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectTech}
              helperText={
                errors.projectTechnology
                  ? String(errors.projectTechnology.message)
                  : ""
              }
            />

            <TextField
              label="Status"
              type="text"
              placeholder="Enter Status"
              value={userData.projectStatus}
              {...register("projectStatus", {
                required: "Status is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectStatus: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectStatus}
              helperText={
                errors.projectStatus
                  ? String(errors.projectStatus.message)
                  : ""
              }
            />

            <TextField
              label="Project Lead"
              type="text"
              placeholder="Enter Project Lead"
              value={userData.projectLead}
              {...register("projectLead", {
                required: "Project Lead is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectLead: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectLead}
              helperText={
                errors.projectLead ? String(errors.projectLead.message) : ""
              }
            />

            <TextField
              label="Project Manager"
              type="text"
              placeholder="Enter Project Manager"
              value={userData.projectManager}
              {...register("projectManager", {
                required: "Project Manager is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectManager: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectManager}
              helperText={
                errors.projectManager
                  ? String(errors.projectManager.message)
                  : ""
              }
            />

            <TextField
              label="Project Client"
              type="text"
              placeholder="Enter Project Client"
              value={userData.projectClient}
              {...register("projectClient", {
                required: "Project Client is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectClient: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectClient}
              helperText={
                errors.projectClient
                  ? String(errors.projectClient.message)
                  : ""
              }
            />
            {/* <MyInput
              label="Project Start Date"
              placeholder="Enter Project Start Date"
              type="Date"
              name="project_start_date"
              value={userData.project_start_date}
              register={register}
              
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                minWidth: "100%",
                marginBottom: "7px",
              }}
              onChange={(e) =>
                setUserData({ ...userData, project_start_date: e.target.value })
              }
              
            />
            <Typography color="error" variant="body2">
              {errors.project_start_date ? String(errors.project_start_date.message) : ""}
            </Typography>
            <JSON.stringify>{userData.project_start_date}</JSON.stringify>

            <MyInput
              label="Project Deadline Date"
              placeholder="Enter Project Deadline Date"
              type="date"
              name="project_deadline_date"
              value={userData.project_deadline_date}
              register={register}
              
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                minWidth: "100%",
                marginBottom: "7px",
              }}
              onChange={(e) =>
                setUserData({ ...userData, project_deadline_date: e.target.value })
              }
            /> */}
            {/* <Typography color="error" variant="body2">
              {errors.project_deadline_date ? String(errors.project_deadline_date.message) : ""}
            </Typography> */}
             <DynamicSelect
              selectFields={[
                {
                  label: "Management Tool",
                  name: "projectManagementTool",
                  placeholder: "Enter Gender",
                  value: userData.managementTool || " ",
                  options: [
                    { value: "Zira", label: "Zira" },
                    { value: "Trello", label: "Trello" },
                  ],
                  register: register("projectManagementTool", {
                    required: "Project Management Tool is required",
                  }),
                  error: errors.projectManagementTool ? String(errors.projectManagementTool.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, projectManagementTool: event.target.value });
                  },
                },
              ]}
            />
            {/* <TextField
              label="Management Tool"
              type="text"
              placeholder="Enter Management Tool"
              value={userData.project_management_tool}
              {...register("project_management_tool", {
                required: "Management Tool is required",
              })}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  project_management_tool: e.target.value,
                })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.project_management_tool}
              helperText={
                errors.project_management_tool
                  ? String(errors.project_management_tool.message)
                  : ""
              }
            /> */}

            <TextField
              label="Management Tool Link"
              type="text"
              placeholder="Enter Management Tool Link"
              value={userData.managementUrl || ""}
              {...register("projectManagementToolUrl", {
                required: "Management Tool Link is required",
              })}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  projectManagementToolUrl: e.target.value,
                })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.managementToolUrl}
              helperText={
                errors.projectManagementToolUrl
                  ? String(errors.projectManagementToolUrl.message)
                  : ""
              }
            />
            <DynamicSelect
              selectFields={[
                {
                  label: "Repository Tool",
                  name: "projectRepoTool",  
                  placeholder: "Enter Repository Tool",
                  value: userData.projectRepoTool || "",
                  options: [
                    { value: "Gitlab", label: "Gitlab" },
                    { value: "Github", label: "Github" },
                  ],
                  register: register("projectRepoTool", {
                    required: "Project Repository Tool is required",
                  }),
                  error: errors.projectRepoTool ? String(errors.projectRepoTool.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, projectRepoTool: event.target.value });
                  },
                },
              ]}
            />
            <TextField
              label="Repository Tool Link"
              type="text"
              placeholder="Enter Repository Tool link"
              value={userData.repoUrl}
              {...register("projectRepoToolUrl", {
                required: "Repository Tool is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectRepoToolUrl: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectRepoToolUrl}
              helperText={
                errors.projectRepoToolUrl
                  ? String(errors.projectRepoToolUrl.message)
                  : ""
              }
            />
            <TextField
              label="Description"
              type="text"
              placeholder="Description"
              value={userData.projectDescription}
              {...register("projectDescription", {
                required: "Repository Tool is required",
              })}
              onChange={(e) =>
                setUserData({ ...userData, projectDescription: e.target.value })
              }
              sx={{
                ".MuiFilledInput-root": {
                  bgcolor: "grey.A100",
                  ":hover": {
                    bgcolor: "background.default",
                  },
                  ":focus": {
                    bgcolor: "background.default",
                  },
                  ":focus-within": {
                    bgcolor: "background.default",
                  },
                  padding: "16px",
                },
                borderRadius: 2,
                width: "100%",
                marginBottom: "16px",
              }}
              error={!!errors.projectDescription}
              helperText={
                errors.projectDescription
                  ? String(errors.projectDescription.message)
                  : ""
              }
            />
            {/* Dynamic Select for gender */}
            {/* <DynamicSelect
              selectFields={[
                {
                  label: "Gender",
                  name: "gender",
                  placeholder: "Enter Gender",
                  value: userData.gender || " ",
                  options: [
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ],
                  register: register("gender", {
                    required: "Gender is required",
                  }),
                  error: errors.gender ? String(errors.gender.message) : "",
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserData({ ...userData, gender: event.target.value });
                  },
                },
              ]}
            /> */}

            <Box
              sx={{
                fontWeight: "fontWeightRegular",
                maxWidth: "300px",
                width: "100%",
                mx: "auto",
              }}
            >
              <MyButton text="Update Project" type="submit" />
            </Box>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateProjects;
