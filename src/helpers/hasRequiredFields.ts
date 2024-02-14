import { type NewData } from 'UserManager/type';

export function hasRequiredFields(newData: NewData): boolean {
    const requiredFields = ['id', 'username', 'age', 'hobbies'];

    for (const field of requiredFields) {
        if (!(field in newData)) {
            return false;
        }
    }

    return true;
}
