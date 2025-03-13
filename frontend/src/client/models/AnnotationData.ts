/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Annotation } from './Annotation';

export type AnnotationData = {
    annotations: Array<Annotation>;
    id_group?: string;
    group_observations_id_to_update?: Array<string>;
    group_observations_id_to_individualize?: Array<string>;
};

