/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Project } from '../models/Project';
import type { ProjectBase } from '../models/ProjectBase';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectsService {

    /**
     * Read Projects
     * @param skip
     * @param limit
     * @returns Project Successful Response
     * @throws ApiError
     */
    public static readProjectsProjectsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Project>> {
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
     * @returns Project Successful Response
     * @throws ApiError
     */
    public static createProjectProjectsPost(
        requestBody: ProjectBase,
    ): CancelablePromise<Project> {
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
     * @returns Project Successful Response
     * @throws ApiError
     */
    public static readProjectProjectsProjectIdGet(
        projectId: number,
    ): CancelablePromise<Project> {
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
     * @returns Project Successful Response
     * @throws ApiError
     */
    public static updateProjectProjectsProjectIdPut(
        projectId: number,
        requestBody: ProjectBase,
    ): CancelablePromise<Project> {
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
     * @returns any Successful Response
     * @throws ApiError
     */
    public static readProjectsWithDeploymentsProjectsWithdeploymentsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/withdeployments/',
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

}
