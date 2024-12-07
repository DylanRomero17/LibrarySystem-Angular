import { Book } from "./book";
import { Loan } from "./loan";

export interface BookLoan {
    id: number;
    status: string;
    returnDate: Date;
    book: Book;
    loan: Loan;
}