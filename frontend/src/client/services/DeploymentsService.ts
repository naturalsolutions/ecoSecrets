/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeploymentBase } from '../models/DeploymentBase';
import type { Deployments } from '../models/Deployments';
import type { DeploymentWithFile } from '../models/DeploymentWithFile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeploymentsService {

    /**
     * Read Deployments
     * @param skip
     * @param limit
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static readDeploymentsDeploymentsGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Deployments>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/deployments/',
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
     * Create Deployment
     * @param requestBody
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static createDeploymentDeploymentsPost(
        requestBody: DeploymentBase,
    ): CancelablePromise<Deployments> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/deployments/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Deployment
     * @param deploymentId
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static readDeploymentDeploymentsDeploymentIdGet(
        deploymentId: number,
    ): CancelablePromise<Deployments> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/deployments/{deployment_id}',
            path: {
                'deployment_id': deploymentId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Deployment
     * @param deploymentId
     * @param requestBody
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static updateDeploymentDeploymentsDeploymentIdPut(
        deploymentId: number,
        requestBody: DeploymentBase,
    ): CancelablePromise<Deployments> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/deployments/{deployment_id}',
            path: {
                'deployment_id': deploymentId,
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
     * Delete Deployment
     * @param deploymentId
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static deleteDeploymentDeploymentsDeploymentIdDelete(
        deploymentId: number,
    ): CancelablePromise<Deployments> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/deployments/{deployment_id}',
            path: {
                'deployment_id': deploymentId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Project Deployments
     * @param projectId
     * @returns Deployments Successful Response
     * @throws ApiError
     */
    public static readProjectDeploymentsDeploymentsProjectProjectIdGet(
        projectId: number,
    ): CancelablePromise<Array<Deployments>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/deployments/project/{project_id}',
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
     * Read Deployments With Files
     * @param skip
     * @param limit
     * @returns DeploymentWithFile Successful Response
     * @throws ApiError
     */
    public static readDeploymentsWithFilesDeploymentsFilesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<DeploymentWithFile>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/deployments/files/',
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
