export interface Platos {
    platos: Plato[];
}

export interface Plato {
    _id?:         string;
    name:        string;
    description: string;
    price:       number;
    isAvailable: boolean;
    category:    string;
    createdAt:   Date;
}

