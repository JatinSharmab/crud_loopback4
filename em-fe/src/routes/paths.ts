// import ChangePassword from "pages/profile/ChangePassword";

import GridExample from "pages/projects_listing/user_data";

export const rootPaths = {
  homeRoot: '/',
  authRoot: 'authentication',
  errorRoot: 'error',
  profileRoot: 'profile',
  projectRoot: 'projects_listing'

};

export const pagesRoutes = {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  profile: `/${rootPaths.profileRoot}`,
  updateProfile: `/${rootPaths.profileRoot}/update`,
  ChangePasswords: `/${rootPaths.profileRoot}/ChangePassword`,
  ListUsers: `/${rootPaths.projectRoot}/ListUsers`,
  AddProjects:`/${rootPaths.projectRoot}/add_projects`,
  UpdateProjects: `/${rootPaths.projectRoot}/update_projects`
};
