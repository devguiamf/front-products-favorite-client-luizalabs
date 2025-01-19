export interface  FavoriteItem {
    id: number;
    title: string;
    image: string;
}

export interface Favorite {
    title: string;
    description: string;
    items: FavoriteItem[];
}