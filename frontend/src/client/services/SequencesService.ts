/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TemplateSequence } from '../models/TemplateSequence';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SequencesService {

    /**
     * Read Template Sequences
     * @param mode
     * @param skip
     * @param limit
     * @returns TemplateSequence Successful Response
     * @throws ApiError
     */
    public static readTemplateSequencesSequencesGet(
        mode: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<TemplateSequence>> {
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
     * @returns TemplateSequence Successful Response
     * @throws ApiError
     */
    public static createTemplateSequenceSequencesPost(
        requestBody: TemplateSequence,
    ): CancelablePromise<TemplateSequence> {
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
