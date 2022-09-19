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
    bait?: string;
    feature?: string;
    description?: string;
    project_id: number;
    template_sequence_id?: number;
    id: number;
    files?: Array<Files>;
};

