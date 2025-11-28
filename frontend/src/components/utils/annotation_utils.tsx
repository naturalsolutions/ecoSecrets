
interface TaxonomyProps {
    classe: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
};

export function getFinestTaxonomicLevel(item: TaxonomyProps): string {
    return item.species || item.genus || item.family || item.order || item.classe
};