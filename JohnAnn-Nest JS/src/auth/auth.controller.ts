import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //서비스를 컨트롤러에서 사용하려면 서비스를 연결해줘야함
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  /*
    요청이 컨트롤러에 포스트-사인업 핸들러에 오기 전에 
    Dto에 설정한 유효성검사를 해주기 위해선 바디안에 
    유효성파이프(ValidationPipe)를 인자로 넣어주어야함
  */

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(AuthCredentialsDto);
  }

  /*
    @Post('/test')
    test(@Req() req) {
      console.log('req', req);
    }

ㅛ     # 요청안에 유저 정보(유저 객체)가 들어가게 하는 방법
    validate 메소드에서 return 값을 user객체로 줬다. 
    그래서 요청 값안에 user 객체가 들어있으면 하는데
    현재 요청을 보낼 때는 user 객체가 없다 어떻게 가져올 수 있을까??

    => UseGuards 안에 @nestjs/passport에서 가져온 AuthGuard()를 이용하면 
    요청안에 유저 정보를 넣을 수 있다
  */

  @Post('/test')
  @UseGuards(AuthGuard())
  //이 부분이 있어야 req안에 user객체가 존재할 수 있음.
  test(@GetUser() user: User) {
    console.log('user', user);
  }
  /*
    req.user 로 유저 객체를 얻는 것이 아니라 
    바로 user라는 파라미터를 가져오려면 커스텀 데코레이터를 사용해야한다.
  */
}
