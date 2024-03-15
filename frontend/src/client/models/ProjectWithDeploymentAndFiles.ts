/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentWithFile } from './DeploymentWithFile';

export type ProjectWithDeploymentAndFiles = {
    name: string;
    creation_date: string;
    start_date?: string;
    end_date?: string;
    protocol?: string;
    acquisition_framework?: string;
    targeted_species?: string;
    referential?: string;
    timezone?: string;
    image?: string;
    owner_id?: number;
    contact_id?: number;
    id: number;
    deployments?: Array<DeploymentWithFile>;
};

