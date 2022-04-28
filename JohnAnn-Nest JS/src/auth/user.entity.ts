import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
/*
  엔티티는 데이터베이스 표를 채우는 것이라면,
  이 엔티티에 들어가는 데이터를 생성, 수정, 삭제를 위해
  레파지토리를 생성(서비스에 써도 되지만 이를 분할하는 것이 레파지토리 패턴)
  레파지토리를 생성하면 이 레파지토리를 사용하기 위해 모듈에 연결시켜줘야함
  결국 레파지토리는 서비스의 내용을 분리시킨 것이므로,
  서비스에 연결해서 해당 코드를 서비스에서 사용할 수 있게 해야한다.
*/
