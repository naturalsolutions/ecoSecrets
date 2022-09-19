/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Deployments } from './Deployments';

export type ProjectWithDeployment = {
    name: string;
    description?: string;
    creation_date: string;
    start_date?: string;
    end_date?: string;
    protocole?: string;
    status?: string;
    targeted_species?: string;
    owner_id?: number;
    contact_id?: number;
    id: number;
    deployments?: Array<Deployments>;
};

