import path from 'path';
import low from 'lowdb';

import { Company } from './types/Company';
import { City } from './types/City';
import { Speciality } from './types/Speciality';

// define sample DB structure
interface DbInterface {
    companies: Company[],
    cities: City[],
    specialities: Speciality[],
}

// create Node adapter around `db.json`
import FileSync from 'lowdb/adapters/FileSync';
const adapter = new FileSync<DbInterface>( path.resolve( __dirname, '../../jsons/db.json' ) );

// export database API
export const db = low( adapter );

