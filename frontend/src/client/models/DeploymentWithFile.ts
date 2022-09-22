/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Files } from './Files';

export type DeploymentWithFile = {
    name: string;
    start_date: string;
    end_date?: string;
    site_id: number;
    device_id: number;
    height?: number;
    support?: string;
    bait?: string;
    feature?: string;
    description?: string;
    image?: string;
    project_id: number;
    id: number;
    files?: Array<Files>;
};

