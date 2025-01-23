export interface  FavoriteItem {
    id: string;
    title: string;
    image: string;
    price: number;
    productApiId: number;
}

export interface Favorite {
    id: string;
    title: string;
    userId: string
    description?: string;
    products?: FavoriteItem[];
}