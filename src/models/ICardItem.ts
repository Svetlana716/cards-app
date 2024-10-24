interface ICategories {
    id: number;
    name: string;
}

interface IBreeds {
    adaptability: number;
    affection_level: number;
    alt_names: string;
    cfa_url: string;
    child_friendly: number;
    country_code: string;
    country_codes: string;
    description: string;
    dog_friendly: number;
    energy_level: number;
    experimental: number;
    grooming: number;
    hairless: number;
    health_issues: number;
    hypoallergenic: number;
    id: string;
    indoor: number;
    intelligence: number;
    lap: number;
    life_span: string;
    name: string;
    natural: 1;
    origin: string;
    rare: number;
    reference_image_id: string;
    rex: number;
    shedding_level: number;
    short_legs: number;
    social_needs: number;
    stranger_friendly: number;
    suppressed_tail: number;
    temperament: string;
    vcahospitals_url: string;
    vetstreet_url: string;
    vocalisation: number;
    weight: { imperial: string; metric: string };
    wikipedia_url: string;
}

export interface ICardItem {
    id: string;
    url: string;
    width: number;
    height: string;
    categories?: ICategories[];
    breeds: IBreeds[] | never[];
}

export interface IResponse {
    cards: ICardItem[];
    count: number;
}

export interface ICreatingCardItem {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}
