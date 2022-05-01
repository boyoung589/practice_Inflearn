import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
//서비스를 불러오는 곳
export class BoardsController {
  //   boardsService: BoardsService;
  //   constructor(boardsService: BoardsService) {
  //     this.boardsService = boardsService;
  //   }
  constructor(private boardsService: BoardsService) {}
  // // 접근 제한자를 생성자(constructor) 파라미터에 선언하면ㅕ
  // // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다
  // @Get('/') // 사용 메소드 컨트롤러 안에서 메소드를 사용할 땐 데코레이터 사용
  // getAllBoards(): Board[] {
  //   //모든 게시물 가져오기
  //   return this.boardsService.getAllBoards(); //모든 게시물을 가져오는 핸들러
  // }
  @Get()
  getAllBoarders(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get()
  getSpecificUsersBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getSpecificUsersBoards(user);
  }

  // //dto 사용 전
  // // @Post()
  // // createBoard(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Board {
  // //   return this.boardsService.createBoard(title, description);
  // //   /*
  // //   1. express의 req.body 가져오기 위해선
  // //   @Body() body를 사용

  // //   2. express의 req.body.title을 가져오기 위해서
  // //   @Body('title') title을 사용

  // //   3. express의 req.body.description을 가져오기 위해서
  // //   @Body('description') descrption을 사용
  // //   */
  // // }

  // //dto 사용 후
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
