import exp from "constants";
import {z} from "zod";

interface FormData {
    lastname:string;
    name:string;
    email:string;
    mobile:number;
    password:string;
    confirmPassword:string;
}

export const signUpSchema = z.object({

    email: z
      .string()
      .min(1, "Please enter your Email.")
      .email("Invalid email address."),
    name: z
      .string()
      .min(1, "Please enter your Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
    lastname: z
      .string()
      .min(1, "Please enter your Last Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),

    password: z
      .string()
      .min(1, "Please enter your Password.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character."
      ),
      confirmPassword: z.string().min(1, "Please confirm your Password."),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

 export const signInSchema = z.object({
    email: z
    .string()
    .min(1,"Please enter your Email"),
    password:z
    .string()
    .min(1,"Please enter your Passworddd"),
  })
  export const AddProjSchema = z.object({

    project_name: z
      .string()
      .min(1, "Please enter Project Name."),
    project_technology: z
      .string()
      .min(1, "Please enter the technology"),
      project_status: z
      .string()
      .min(1, "Please enter the status of project."),
      project_start_date: z
      .string()
      .min(1, "Please enter Starting date of Project."),

      project_deadline_date: z
      .string()
      .min(1, "Please enter Ending date of project."),

      project_lead: z
      .string()
      .min(1, "Please enter Name of Project Lead."),

      project_manager: z
      .string()
      .min(1, "Please enter name of Project Manager."),

      project_client: z
      .string()
      .min(1, "Please enter name of Project Client."),

      project_management_tool: z
      .string()
      .min(1, "Please enter project management tool."),

      project_management_tool_url: z
      .string()
      .min(1, "Please enter projet management tool URL."),

      project_repo_tool: z
      .string()
      .min(1, "Please enter the Projet Repo Tool."),
      project_repo_url: z
      .string()
      .min(1, "Please enter Project Repo URL."),

      description: z
      .string()
      .min(1, "Enter Description of Project"),

  });

  export const editProfileSchema=z.object({
    
  })