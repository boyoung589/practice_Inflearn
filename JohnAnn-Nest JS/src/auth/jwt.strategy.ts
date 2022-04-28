import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './uer.repository';
import { User } from './user.entity';

@Injectable()
//다른 곳에서도 사용할 수 있게 주입하기 위해
//Next.js can inject it anywhere this service is needed.
//via its Dependency Injection system
export class JwtStrategy extends PassportStrategy(Strategy) {
  //the class extends the PassportStrategy class defined by @nestjs/passport package
  //you're passing the JWT Strategy defined by the passport-jwt Node.js package
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      //super: 부모 컴포넌트에 있는 것을 사용하기 위해 필요
      secretOrKey: process.env.SECRET, //토큰 유효한지 확인
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //클라이언트에서 오는 토큰이 어디서 오는지 적어주는 것
    });
  }
  async validate(payload) {
    /*
      payload: 로그인 할 때 생성한 토큰을 클라이언트가 필요한 작업을 할 때 header에 넣어서 요청을 보낸다.
      요청 내부에 있는 토큰의 두번째 부분인 payload를 말한다.
      그 안에 username을 넣어줬기 때문에 이를 이용해서 데이터베이스 내부에 같은 username이 있는지 찾고,
      있으면 저장된 유저 정보를 리턴한다.
      이런 처리를 쉽게 해주는 것이 passport 모듈.
    */
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
