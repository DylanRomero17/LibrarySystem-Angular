import { Image } from './image';

export interface Book {
    id: number;
    title: string;
    author: string;
    pages: number;
    price: number;
    image?: Image;
    available: number;
    borrowed: number;
}