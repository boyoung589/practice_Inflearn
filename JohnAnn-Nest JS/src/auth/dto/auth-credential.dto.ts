import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어와 숫자만 가능한 유효성체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: `password only accepts english and number`,
  })
  // @Matches(패턴: 정규표현식, 옵션?:정규표현식 위반시 나타낼 에러문구(객체))
  password: string;
}
/*
  DB에서 데이터를 얻어 Service나 Controller 등으터 보낼 때 사용하는 객체를 말한다.
  즉, DB의 데이터가 Presentation Logic Tier로 넘어오게 될 때는 DTO의 모습으로 바껴서 오고가는 것이다.
  로직을 갖고 있지 않는 순수한 데이터 객체이며, getter/setter 메서드만을 갖는다.
  하지만 DB에서 꺼낸 값을 임의로 변경할 필요가 없기 때문에 DTO클래스에는 setter가 없다. (대신 생성자에서 값을 할당한다.)
  https://gmlwjd9405.github.io/2018/12/25/difference-dao-dto-entity.html
*/
