import { Test, TestingModule } from '@nestjs/testing';
import { AuthPublicController } from './auth-public.controller';
import { AuthService } from '../../application/auth.service';

describe('AuthController', () => {
  let controller: AuthPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthPublicController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthPublicController>(AuthPublicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
