/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectBase } from '../models/ProjectBase';
import type { ProjectWithDeployment } from '../models/ProjectWithDeployment';
import type { ProjectWithDeploymentAndFiles } from '../models/ProjectWithDeploymentAndFiles';
import type { ReadProject } from '../models/ReadProject';
import type { Stats_Project } from '../models/Stats_Project';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * Read Projects
     * @param skip
     * @param limit
     * @returns ReadProject Successful Response
     * @throws ApiError
     */
    public static readProjectsProjectsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<ReadProject>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Project
     * @param requestBody
     * @returns ReadProject Successful Response
     * @throws ApiError
     */
    public static createProjectProjectsPost(
        requestBody: ProjectBase,
    ): CancelablePromise<ReadProject> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Project
     * @param projectId
     * @returns ReadProject Successful Response
     * @throws ApiError
     */
    public static readProjectProjectsProjectIdGet(
        projectId: number,
    ): CancelablePromise<ReadProject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Project
     * @param projectId
     * @param requestBody
     * @returns ReadProject Successful Response
     * @throws ApiError
     */
    public static updateProjectProjectsProjectIdPut(
        projectId: number,
        requestBody: ProjectBase,
    ): CancelablePromise<ReadProject> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Project
     * @param projectId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteProjectProjectsProjectIdDelete(
        projectId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/projects/{project_id}',
            path: {
                'project_id': projectId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Projects With Deployments
     * @param skip
     * @param limit
     * @returns ProjectWithDeployment Successful Response
     * @throws ApiError
     */
    public static readProjectsWithDeploymentsProjectsDeploymentsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<ProjectWithDeployment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/deployments/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Projects With Deployments
     * @param skip
     * @param limit
     * @returns ProjectWithDeploymentAndFiles Successful Response
     * @throws ApiError
     */
    public static readProjectsWithDeploymentsProjectsDeploymentsAndFilesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<ProjectWithDeploymentAndFiles>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/deployments_and_files/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Stats Projects
     * @returns Stats_Project Successful Response
     * @throws ApiError
     */
    public static getStatsProjectsProjectsStatsProjectsGet(): CancelablePromise<Array<Stats_Project>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/stats_projects/',
            errors: {
                404: `Not found`,
            },
        });
    }

}
