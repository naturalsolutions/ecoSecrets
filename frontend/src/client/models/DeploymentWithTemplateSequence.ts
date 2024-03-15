/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TemplateSequence } from './TemplateSequence';

export type DeploymentWithTemplateSequence = {
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
    template_sequences?: Array<TemplateSequence>;
};

