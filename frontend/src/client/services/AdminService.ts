/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * Update Admin
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateAdminAdminPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin/',
            errors: {
                418: `I'm a teapot`,
            },
        });
    }

}
