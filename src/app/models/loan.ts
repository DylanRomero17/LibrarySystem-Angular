import { User } from "../models/user";
import { Employee } from "./employee";

export interface Loan {
    id: number;
    loanDate: Date;
    loanStatus: string;
    user: User;
    employee: Employee;
}