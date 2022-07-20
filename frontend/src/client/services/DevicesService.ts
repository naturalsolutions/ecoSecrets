/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Device } from '../models/Device';
import type { DeviceBase } from '../models/DeviceBase';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DevicesService {

    /**
     * Read Devices
     * @param skip
     * @param limit
     * @returns Device Successful Response
     * @throws ApiError
     */
    public static readDevicesDevicesGet(
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<Device>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/devices/',
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
     * Create Device
     * @param requestBody
     * @returns Device Successful Response
     * @throws ApiError
     */
    public static createDeviceDevicesPost(
        requestBody: DeviceBase,
    ): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/devices/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Device
     * @param deviceId
     * @returns Device Successful Response
     * @throws ApiError
     */
    public static readDeviceDevicesDeviceIdGet(
        deviceId: number,
    ): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/devices/{device_id}',
            path: {
                'device_id': deviceId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Device
     * @param deviceId
     * @param requestBody
     * @returns Device Successful Response
     * @throws ApiError
     */
    public static updateDeviceDevicesDeviceIdPut(
        deviceId: number,
        requestBody: DeviceBase,
    ): CancelablePromise<Device> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/devices/{device_id}',
            path: {
                'device_id': deviceId,
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
     * Delete Device
     * @param deviceId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteDeviceDevicesDeviceIdDelete(
        deviceId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/devices/{device_id}',
            path: {
                'device_id': deviceId,
            },
            errors: {
                404: `Not found`,
                422: `Validation Error`,
            },
        });
    }

}
