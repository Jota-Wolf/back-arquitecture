import { Controller, Post, Body, Inject, HttpCode } from '@nestjs/common';
import { LoginDto } from '../../domain/dto/login.dto';
import { RegisterDto } from '../../domain/dto/register.dto';
import { IAuth } from '../../domain/interfaces/auth.interface';
import { AUTH_SERVICE } from '../../types/auth.constants';
import { Public } from '../../../shared/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthPublicController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: IAuth,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerClient(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
