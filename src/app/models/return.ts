import { Employee } from "./employee";
import { Loan } from "./loan";

export interface Return {
    id: number;
    returnDate: Date;
    status: string;
    observation?: string;
    loan: Loan;
    employee: Employee;
}