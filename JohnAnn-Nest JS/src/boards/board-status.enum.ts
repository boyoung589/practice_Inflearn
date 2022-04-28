/* 게시물에 필요한 데이터가 어떤것이 필요한지를 정의해주기 위해서 게시물의 모델을 만들어준다.
    예를들어 게시물 데이터에는 id가 필요하고, 이름이나 설명 등이 필요하다.
    모델을 정의하기 위해선 Class나 Interface를 이용하면 된다.
    Class: 변수의 타입을 체크하고, 인스턴스를 생성할 수 있음
    Interface: 변수의 타입만을 체크함.
*/
// export interface Board {
//   id: string;
//   title: string;
//   description: string;
//   status: BoardStatus;
// }
// interfaced 부분은 데이터베이스를 사용하면서 엔티티에 적었으므로 필요없어짐.(원래 파일 이름: board.model.ts)

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
