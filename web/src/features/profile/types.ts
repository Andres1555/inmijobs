export interface User {
    id: string;
    name: string;
    role: string;
    tagline?: string; // Valor del banner: "Transformando ideas en interfaces funcionales"
    location: string;
    flags?: string[]; // Códigos ISO 3166-1 (ej: ['VE','CA']) → badges en avatar
    avatarUrl: string;
    coverUrl: string;
    friendsCount: number;
}

export interface Friend {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface Photo {
    id: string;
    url: string;
}

export interface Post {
    id: string;
    author: User;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    timestamp: string;
}
