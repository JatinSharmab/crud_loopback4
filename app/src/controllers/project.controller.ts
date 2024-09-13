import {repository} from '@loopback/repository';
import {
  post,
  param,
  requestBody,
  HttpErrors,
  get,
  del,
  patch,
} from '@loopback/rest';
import {EmProjectsRepository} from '../repositories/em-projects.repository';
import {EmProjects} from '../models/em-projects.model';
// import {authenticate} from '@loopback/authentication';
import {getUserIdFromToken} from '../services/token.service';
import {intercept} from '@loopback/core';

// @authenticate('jwt')
@intercept('interceptors.ResponseInterceptor')
export class ProjectController {
  constructor(
    @repository(EmProjectsRepository)
    public projectRepository: EmProjectsRepository,
  ) {}

  @patch('/projects/{projectId}')
  async editProject(
    @param.path.number('projectId') projectId: number,
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'Project details for updating',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              projectName: {type: 'string'},
              projectTech: {type: 'string'},
              projectStatus: {type: 'string'},
              projectManager: {type: 'string'},
              projectLead: {type: 'string'},
              projectClient: {type: 'string'},
              managementTool: {type: 'string'},
              managementUrl: {type: 'string'},
              repoTool: {type: 'string'},
              repoUrl: {type: 'string'},
              projectDescription: {type: 'string'},
            },
          },
        },
      },
    })
    projectDetails: Partial<EmProjects>,
  ): Promise<object> {
    // Authorization check
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    // Destructure the project details from the body
    const {
      projectName,
      projectTech,
      projectStatus,
      projectManager,
      projectLead,
      projectClient,
      managementTool,
      managementUrl,
      repoTool,
      repoUrl,
      projectDescription,
    } = projectDetails;

    // Validate the input
    if (
      !projectName &&
      !projectTech &&
      !projectStatus &&
      !projectManager &&
      !projectLead &&
      !projectClient &&
      !managementTool &&
      !managementUrl &&
      !repoTool &&
      !repoUrl &&
      !projectDescription
    ) {
      throw new HttpErrors.BadRequest('At least one field must be provided.');
    }

    try {
      // Update the project details in the database
      const updatedProject = await this.projectRepository.updateById(
        projectId,
        {
          projectName,
          projectTech,
          projectStatus,
          projectManager,
          projectLead,
          projectClient,
          managementTool,
          managementUrl,
          repoTool,
          repoUrl,
          projectDescription,
        },
      );

      // Fetch the updated project
      const updatedProjects = await this.projectRepository.find({
        where: {
          projectUserId: userId,
        },
        fields: {
          projectName: true,
          projectTech: true,
          projectStatus: true,
          projectManager: true,
          projectLead: true,
          projectClient: true,
          managementTool: true,
          managementUrl: true,
          repoTool: true,
          repoUrl: true,
          projectDescription: true,
        },
      });

      return {
        statusCode: 200,
        message: 'Project updated successfully',
        data: updatedProjects,
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError(
        `Error updating project: ${err.message}`,
      );
    }
  }

  @post('/projects/add')
  async addProject(
    @param.header.string('Authorization') authorizationHeader: string,
    @requestBody({
      description: 'Project details',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              projectName: {type: 'string'},
              projectDescription: {type: 'string'},
              projectTech: {type: 'string'},
              projectStatus: {type: 'string'},
              projectLead: {type: 'string'},
              projectManager: {type: 'string'},
              projectClient: {type: 'string'},
              managementTool: {type: 'string'},
              managementUrl: {type: 'string'},
              repoTool: {type: 'string'},
              repoUrl: {type: 'string'},
              // projectStartDate: {type: 'string', format: 'date'},
              // projectDeadlineDate: {type: 'string', format: 'date'},
            },
            required: ['projectName', 'projectDescription'],
          },
        },
      },
    })
    projectDetails: Partial<EmProjects>,
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    const {
      projectName,
      projectDescription,
      projectTech,
      projectStatus,
      projectLead,
      projectManager,
      projectClient,
      managementTool,
      managementUrl,
      repoTool,
      repoUrl,
      projectStartDate,
      projectDeadlineDate,
    } = projectDetails;

    if (!projectName || !projectDescription) {
      throw new HttpErrors.BadRequest('Fields can`t be empty.');
    }

    try {
      const startDate = projectStartDate
        ? new Date(projectStartDate).toISOString()
        : undefined;
      const deadlineDate = projectDeadlineDate
        ? new Date(projectDeadlineDate).toISOString()
        : undefined;

      const project = await this.projectRepository.create({
        projectUserId: userId,
        projectName,
        projectDescription,
        projectTech,
        projectStatus,
        projectLead,
        projectManager,
        projectClient,
        managementTool,
        managementUrl,
        repoTool,
        repoUrl,
        projectStartDate: startDate,
        projectDeadlineDate: deadlineDate,
      });

      return {
        data: {project},
      };
    } catch (err) {
      throw new HttpErrors.InternalServerError('Error adding project.');
    }
  }

  @get('/projects')
  async listProjects(
    @param.header.string('Authorization') authorizationHeader: string,
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    try {
      const projects = await this.projectRepository.find({
        where: {
          projectUserId: userId,
        },
      });

      if (projects.length < 1) {
        throw new HttpErrors.NotFound('No projects found.');
      }

      return {
        data: {projects},
      };
    } catch (err: any) {
      throw new HttpErrors.InternalServerError('Error retrieving projects.');
    }
  }
  @get('/project/{id}')
  async getProjectById(
    @param.path.number('id') projectId: number,
    @param.header.string('Authorization') authorizationHeader: string,
  ): Promise<object> {
    const token = authorizationHeader;

    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    try {
      const project = await this.projectRepository.findOne({
        where: {
          projectId: projectId,
          projectUserId: userId, // Ensure the project belongs to the user
        },
      });

      if (!project) {
        throw new HttpErrors.NotFound('Project not found.');
      }

      return {
        data: project, // Return the specific project details
      };
    } catch (err: any) {
      throw new HttpErrors.InternalServerError('Error retrieving project.');
    }
  }

  @del('/projects/{id}')
  async deleteProject(
    @param.header.string('Authorization') authorizationHeader: string,
    @param.path.number('id') projectId: number,
  ): Promise<object> {
    const token = authorizationHeader;
    if (!token) {
      throw new HttpErrors.Unauthorized('No token provided.');
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      throw new HttpErrors.Unauthorized('Invalid token.');
    }

    try {
      const project = await this.projectRepository.findOne({
        where: {
          projectId: projectId,
          projectUserId: userId,
        },
      });

      if (!project) {
        throw new HttpErrors.NotFound('Project does not exist.');
      }

      await this.projectRepository.deleteById(projectId);

      return {};
    } catch (err: any) {
      throw new HttpErrors.InternalServerError('Error deleting project.');
    }
  }
}
