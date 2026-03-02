/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReadFiles } from './ReadFiles';

export type DeploymentWithFile = {
    name: string;
    start_date: string;
    end_date?: (string | null);
    site_id: number;
    device_id: number;
    height?: (number | null);
    support?: (string | null);
    bait?: (string | null);
    feature?: (string | null);
    description?: (string | null);
    image?: (string | null);
    project_id: number;
    id: number;
    files?: (Array<ReadFiles> | null);
};

