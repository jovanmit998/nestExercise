/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
            const rolesArr =  this.users.filter((user) => user.role === role);
            if(rolesArr.length === 0) throw new NotFoundException("User Role Not Found")
            return rolesArr;
        }
        return this.users
    }

    findOne(id: string) {
        const user = this.users.find((user) => user.id === id)

        if(!user) throw new NotFoundException('User Not Found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => Number(b.id) - Number(a.id));
        const newUser = {
            id: Number(usersByHighestId[0].id) + 1 + '',
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
       this.users = this.users.map((user) => {
        if(user.id === id) {
            return  ({
                ...user,
                ...updateUserDto
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
