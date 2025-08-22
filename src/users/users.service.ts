import { Injectable } from '@nestjs/common';

export interface User {
    id: string,
    name: string,
    email: string,
    role: string 
}

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            "id": "1",
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": "2",
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": "3",
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": "4",
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": "5",
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role) {
            return this.users.filter((user) => user.role === role)
        }
        return this.users
    }

    findOne(id: string) {
        return this.users.find((user) => user.id === id)
    }

    create(user: Omit<User, 'id'>) {
        const usersByHighestId = [...this.users].sort((a,b) => Number(b.id) - Number(a.id));
        const newUser = {
            id: Number(usersByHighestId[0].id) + 1 + '',
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, userUpdate: Omit<Partial<User>, 'id'>) {
       this.users = this.users.map((user) => {
        if(user.id === id) {
            return  ({
                ...user,
                ...userUpdate
            })
        }
        return user
       })
        return this.findOne(id)
    }

    delete(id: string) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter((user) => user.id !== id)
        return removedUser;
    }
}
