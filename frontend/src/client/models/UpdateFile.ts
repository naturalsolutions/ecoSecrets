/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnnotationData } from './AnnotationData';
import type { MetadataData } from './MetadataData';

export type UpdateFile = {
    metadata?: (MetadataData | null);
    annotations?: (AnnotationData | null);
    deployment_id: number;
};

