export interface Item {
    id: string;
    user: {
        name: string;
        bio: string;
    };
    urls: {
        regular: string;
    };
}