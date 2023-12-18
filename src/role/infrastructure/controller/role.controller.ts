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
import { FindAllRoleParamDto } from '../../../role/domain/dto/param-findAll-role.dto';
import { UserIdParamDto } from '../../../user/domain/dto/param-findOne-user.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() params: FindAllRoleParamDto) {
    return this.roleService.findAll(params);
  }

  @Get(':id')
  findOne(@Param() { id }: UserIdParamDto) {
    return this.roleService.findById({ id });
  }

  @Patch(':id')
  update(
    @Param() { id }: UserIdParamDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update({ id }, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UserIdParamDto) {
    return this.roleService.delete({ id });
  }
}
