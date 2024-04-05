import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { FindAllUserParamDto } from '../../../user/domain/dto/param-findAll-user.dto';
import { UserIdParamDto } from '../../../user/domain/dto/param-findOne-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() params: FindAllUserParamDto) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() { id }: UserIdParamDto) {
    return this.userService.findById({ id });
  }

  @Patch(':id')
  update(
    @Param() { id }: UserIdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update({ id }, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UserIdParamDto) {
    return this.userService.delete({ id });
  }
}
