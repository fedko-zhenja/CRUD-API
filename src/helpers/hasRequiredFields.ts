import { type NewData } from 'UserManager/type';
import { v4 as uuidv4 } from 'uuid';

export function hasRequiredFields(newData: NewData): boolean {
    const requiredFields = ['id', 'username', 'age', 'hobbies'];

    newData.id = uuidv4();

    const keysInObject = Object.keys(newData);

    for (let i = 0; i < keysInObject.length; i++) {
        if (!requiredFields.includes(keysInObject[i])) {
            return false;
        }
    }

    return true;
}
