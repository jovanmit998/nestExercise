/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Patch(':id') //PATCH users/:id
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id') //DELETE user/:id
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
