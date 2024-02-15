import { type NewData } from 'UserManager/type';
import { v4 as uuidv4 } from 'uuid';

export function hasRequiredFields(newData: NewData): boolean {
    const requiredFields = ['username', 'age', 'hobbies'];

    newData.id = uuidv4();

    for (const field of requiredFields) {
        if (!(field in newData)) {
            return false;
        }
    }

    return true;
}
