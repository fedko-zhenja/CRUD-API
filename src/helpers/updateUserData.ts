import type { User, NewData } from 'UserManager/type';

type findUser = Record<string, string>;
type data = Record<string, string>;

export function updateUserData(index: number, newData: NewData, usersArray: User[]): void {
    const user = usersArray[index] as unknown as findUser;
    const data = newData as data;

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(newData, key) && Object.prototype.hasOwnProperty.call(user, key)) {
            user[key] = data[key];
        }
    }
}
