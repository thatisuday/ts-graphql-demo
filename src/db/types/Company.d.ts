import { City } from './City';
import { Speciality } from './Speciality';

export interface Company {
    id: string;
    name: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    about: string;
    registered: string;
    city: string;
    specialities: string[];
}
