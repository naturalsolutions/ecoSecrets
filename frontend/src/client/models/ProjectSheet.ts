/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataProject } from './DataProject';
import type { DeploymentForProjectSheet } from './DeploymentForProjectSheet';

export type ProjectSheet = {
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
    deployments?: Array<DeploymentForProjectSheet>;
    stats: DataProject;
};

