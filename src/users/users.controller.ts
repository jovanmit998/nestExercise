import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get() //GET users or user?role=admin
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    @Get(':id') //GET user/:id
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Post() //POST /users
    create(@Body() user: Omit<User, 'id'>) {
        return this.userService.create(user);
    }

    @Patch(':id') //PATCH users/:id
    update(@Param('id') id: string, @Body() userUpdate: Omit<Partial<User>, 'id'>) {
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id') //DELETE user/:id
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
