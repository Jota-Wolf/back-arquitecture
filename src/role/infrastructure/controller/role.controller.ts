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
import { RoleService } from '../../application/role.service';
import { CreateRoleDto } from '../../domain/dto/create-role.dto';
import { UpdateRoleDto } from '../../domain/dto/update-role.dto';
import { FindAllRoleParamDto } from 'src/role/domain/dto/param-findAll-role.dto';
import { UserParamDto } from 'src/user/domain/dto/update-user.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    console.log('createRoleDto', createRoleDto);
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() params: FindAllRoleParamDto) {
    return this.roleService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() { id }: UserParamDto) {
    return this.roleService.findById({ id });
  }

  @Patch(':id')
  update(@Param() { id }: UserParamDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update({ id }, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UserParamDto) {
    return this.roleService.delete({ id });
  }
}
