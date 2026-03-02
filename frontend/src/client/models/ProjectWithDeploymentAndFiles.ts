/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeploymentWithFile } from './DeploymentWithFile';

export type ProjectWithDeploymentAndFiles = {
    name: string;
    creation_date: string;
    start_date?: (string | null);
    end_date?: (string | null);
    protocol?: (string | null);
    acquisition_framework?: (string | null);
    targeted_species?: (string | null);
    referential?: (string | null);
    timezone?: (string | null);
    image?: (string | null);
    id: number;
    deployments?: (Array<DeploymentWithFile> | null);
};

