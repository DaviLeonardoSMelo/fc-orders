import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  Login(@Body() body: {username: string; password: string }) {
    return this.authService.login(body.username,body.password)
  }
}
