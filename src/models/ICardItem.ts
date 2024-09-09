interface ICategory {
    id: number;
    name: string;
    image: string;
}

export interface ICardItem {
    id: number; //The id of the product.
    title: string; //The name of the product.
    price: number; //Price the product.
    description: string; //Description the product.
    category: ICategory; //Object of category.
    images: string[]; //List of images like URLs.
    liked?: boolean; // liked status
}
