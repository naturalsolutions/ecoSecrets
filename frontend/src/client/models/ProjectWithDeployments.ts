/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Deployment } from './Deployment';

export type ProjectWithDeployments = {
    name: string;
    description: string;
    creation_date?: string;
    end_date?: string;
    status?: string;
    owner_id?: number;
    contact_id?: number;
    id: number;
    deployments?: Array<Deployment>;
};

