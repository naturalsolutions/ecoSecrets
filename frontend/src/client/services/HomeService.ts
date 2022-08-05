/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Stats } from '../models/Stats';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HomeService {

    /**
     * Get User Stats
     * @returns Stats Successful Response
     * @throws ApiError
     */
    public static getUserStatsHomeStatsGet(): CancelablePromise<Stats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/home/stats/',
            errors: {
                404: `Not found`,
            },
        });
    }

}
