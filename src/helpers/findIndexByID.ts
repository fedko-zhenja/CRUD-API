import type { User } from 'UserManager/type';

export function findIndexByID(searchUser: User, usersArray: User[]): number {
    const index = usersArray.findIndex((user) => user.id === searchUser.id);

    return index;
}
