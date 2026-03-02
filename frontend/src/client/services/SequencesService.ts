/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TemplateSequenceRead } from '../models/TemplateSequenceRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SequencesService {

    /**
     * Read Template Sequences
     * @param mode
     * @param skip
     * @param limit
     * @returns TemplateSequenceRead Successful Response
     * @throws ApiError
     */
    public static readTemplateSequencesSequencesGet(
        mode: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<TemplateSequenceRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sequences/',
            query: {
                'mode': mode,
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
     * Create Template Sequence
     * @param requestBody
     * @returns TemplateSequenceRead Successful Response
     * @throws ApiError
     */
    public static createTemplateSequenceSequencesPost(
        requestBody: TemplateSequenceRead,
    ): CancelablePromise<TemplateSequenceRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sequences/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}
