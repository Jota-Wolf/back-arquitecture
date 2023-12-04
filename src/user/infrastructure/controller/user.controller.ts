import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto, UserParamDto } from '../../domain/dto/update-user.dto';
import { FindAllUserParamDto } from 'src/user/domain/dto/param-findAll-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: FindAllUserParamDto) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() { id }: UserParamDto) {
    return this.userService.findById({ id });
  }

  @Patch(':id')
  update(@Param() { id }: UserParamDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ id }, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UserParamDto) {
    return this.userService.delete({ id });
  }
}
