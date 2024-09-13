import {
  Box,
  Link,
  Paper,
  Stack,
  Typography,
  Snackbar,
  Alert,
  
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
// import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DateField } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import { useState, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { rootPaths } from "routes/paths";
import Image from "components/base/Image";
import logoWithText from "/Logo-with-text.png";
import MyButton from "components/common/button";
import MyInput from "components/common/myInput";
import { AddProjSchema } from "components/common/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicSelect from "components/common/select";

const AddProjects = (): ReactElement => {
  const navigate = useNavigate();
  const formatDate = (dateString: string): string => {
    const [month, day, year] = dateString.split("/");
    return `20${year}-${month}-${day}`; // Assuming yy is in the 2000s
  };
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(AddProjSchema),
  });
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        console.log("Navigating to home...");
        navigate("/projects");
      }, 2000);
      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }
  }, [success, navigate]);
  
  const onSubmit = async (data: any) => {
    const stformattedDate = formatDate(data.project_start_date);
    const deadformattedDate = formatDate(data.project_deadline_date);

    const requestData = {
      ...data,
      project_start_date:stformattedDate,
      project_deadline_date: deadformattedDate,
    };
    
    const token = localStorage.getItem('Token');
    if(!token){
      console.log("No Token Found");
      return;
      
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/projects/add",
        {
          method: "POST",
          headers: {
            Authorization:` ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName: data.project_name,
            projectTech: data.project_technology,
            projectStatus: data.project_status,
            // project_created_at: new Date().toISOString(), 
            // projectStartDate: data.project_start_date,
            // projectDeadlineDate: data.project_deadline_date,
            projectLead: data.project_lead,
            projectManager: data.project_manager,
            projectClient: data.project_client,
            managementTool: data.project_management_tool,
            managementUrl: data.project_management_tool_url,
            repoTool: data.project_repo_tool,
            repoUrl: data.project_repo_url,
            projectDescription: data.description,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("server", { message: "Failed to add data. Please try again." });
      }
    } catch (error: any) {
      setError("server", { message: error.message });
    }
  };

  return (
    <div className="main">
      <Box component="figure" mb={5} mx="auto" textAlign="center">
        <Link href={rootPaths.homeRoot}>
          <Image src={logoWithText} alt="logo with text" height={60} />
        </Link>
      </Box>
      <Paper sx={{ py: 6, px: { xs: 5, sm: 7.5 } }}>
        <Stack justifyContent="center" gap={5}>
          <Typography variant="h3" textAlign="center" color="text.secondary">
            Add New Project
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            
           

            <MyInput
              label="Project Name"
              placeholder="Enter Project Name"
              type="text"
              name="project_name"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_name ? String(errors.project_name.message) : ""}
            </Typography>

            <MyInput
              label="Project Technology"
              placeholder="Enter Project Technology"
              type="text"
              name="project_technology"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_technology ? String(errors.project_technology.message) : ""}
            </Typography>

            <MyInput
              label="Project Status"
              placeholder="Enter Project Status"
              type="text"
              name="project_status"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_status ? String(errors.project_status.message) : ""}
            </Typography>
            {/* <DateField
  label="Full letter month"

  format="LL"
/> */}
           {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select Date"
        
      />
    </LocalizationProvider> */}

            <MyInput
              label="Project Start Date"
              placeholder="Enter Project Start Date"
              type="Date"
              name="project_start_date"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_start_date ? String(errors.project_start_date.message) : ""}
            </Typography>

            <MyInput
              label="Project Deadline Date"
              placeholder="Enter Project Deadline Date"
              type="date"
              name="project_deadline_date"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_deadline_date ? String(errors.project_deadline_date.message) : ""}
            </Typography>

            <MyInput
              label="Project Lead"
              placeholder="Enter Project Lead"
              type="text"
              name="project_lead"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_lead ? String(errors.project_lead.message) : ""}
            </Typography>

            <MyInput
              label="Project Manager"
              placeholder="Enter Project Manager"
              type="text"
              name="project_manager"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_manager ? String(errors.project_manager.message) : ""}
            </Typography>

            <MyInput
              label="Project Client"
              placeholder="Enter Project Client"
              type="text"
              name="project_client"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_client ? String(errors.project_client.message) : ""}
            </Typography>
               <DynamicSelect
              selectFields={[
                {
                  label: "Project Management Tool",
                  name: "project_management_tool",
                  placeholder: "Enter Project Management Tool",
                  // value:"",
                  options: [
                    { value: "Trello", label: "Trello" },
                    { value: "Zira", label: "Zira" },
                  ],
                  register: register("project_management_tool", {
                    required: "Project management tool is required",
                  }),
                  error: errors.gender ? String(errors.gender.message) : "",
                  onChange: () => {
                    
                  },
                },
              ]}
            />
            {/* <MyInput
              label="Project Management Tool"
              placeholder="Enter Project Management Tool"
              type="text"
              name="project_management_tool"
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
            /> */}
            <Typography color="error" variant="body2">
              {errors.project_management_tool ? String(errors.project_management_tool.message) : ""}
            </Typography>

            <MyInput
              label="Project Management Tool URL"
              placeholder="Enter Project Management Tool URL"
              type="text"
              name="project_management_tool_url"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_management_tool_url ? String(errors.project_management_tool_url.message) : ""}
            </Typography>
            <Typography color="error" variant="body2">
              {errors.project_client ? String(errors.project_client.message) : ""}
            </Typography>
               <DynamicSelect
              selectFields={[
                {
                  label: "Project Repo Tool",
                  name: "project_management_tool",
                  placeholder: "Enter Project Repo Tool",
                  // value:"",
                  options: [
                    { value: "Github", label: "Github" },
                    { value: "Gitlab", label: "Gitlab" },
                    { value: "Gitlab", label: "Gitlab" },

                  ],
                  register: register("project_repo_tool", {
                    required: "Project management tool is required",
                  }),
                  error: errors.gender ? String(errors.gender.message) : "",
                  onChange: () => {
                    
                  },
                },
              ]}
            />
            <MyInput
              label="Project Repo Tool"
              placeholder="Enter Project Repo Tool"
              type="text"
              name="project_repo_tool"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_repo_tool ? String(errors.project_repo_tool.message) : ""}
            </Typography>

            <MyInput
              label="Project Repo URL"
              placeholder="Enter Project Repo URL"
              type="text"
              name="project_repo_url"
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
            />
            <Typography color="error" variant="body2">
              {errors.project_repo_url ? String(errors.project_repo_url.message) : ""}
            </Typography>

            <MyInput
              label="Description"
              placeholder="Enter Description"
              type="text"
              name="description"
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
            />
            <Typography color="error" variant="body2">
              {errors.description ? String(errors.description.message) : ""}
            </Typography>

            <MyButton type="submit" text="Add" />
          </form>
          {success && (
            <Snackbar open={success} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
              <Alert severity="success" sx={{ width: "100%" }}>
                Project added successfully! Redirecting...
              </Alert>
            </Snackbar>
          )}
        </Stack>
      </Paper>
    </div>
  );
};

export default AddProjects;
