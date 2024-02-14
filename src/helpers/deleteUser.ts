import type { User } from 'UserManager/type';

export function deleteUser(index: number, usersArray: User[]): void {
    usersArray.splice(index, 1);
}
