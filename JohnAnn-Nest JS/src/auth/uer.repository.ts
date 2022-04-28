import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
//엔티티 유저의 레파지토리
export class UserRepository extends Repository<User> {
  /*
    <유저>의 레파지토리에 기반한 유저레파지토리 클래스를 밖에서도 사용할거야!
    생성, 수정, 삭제를 위해서 => Repository Pattern
    레파지토리를 생성하면, 이 레파지토리를 사용하기 위해 해당 모듈에 연결시켜줘야함
    결국 레파지토리는 서비스의 내용을 분리시킨 것이므로,
    서비스에 연결해서 해당 코드를 서비스에서 사용할 수 있게 해야한다.
    컨스트럭터(생성자)로 유저 레파지토리를 가져와서 인스턴스 생성한다.
  */
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      console.log('error.errno', error.errno); //error.errno 1062
      console.log('error.code', error.code); //error.code ER_DUP_ENTRY
      if (error.errno === 1062) {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
