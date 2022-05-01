/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  // getAllBoards(): Board[] {
  //   //모든 게시물 가져오기
  //   return this.boards;
  // }

  async getSpecificUsersBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', {userId: user.id});

    const boards = await query.getMany();

    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   //게시물 생성
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  async getBoardById(id: number): Promise <Board> {
    const found = await this.boardRepository.findOne(id);

    if(!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found;
  }
  // getBoardById(id: string): Board {
  //   //게시글 아이디에 따라 게시글 하나 찾기
  //   //아이디에 따른 보드 하나만 리턴하므로 리턴값이 배열이 아님
  //   const found = this.boards.find((board) => board.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Cant't find Board with id ${id}`);
  //   }
  //   return found;
  // }
  async deleteBoard(id: number, user: User): Promise <void> {
    const result = await this.boardRepository.delete({id: id, user: user});
    if(result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }
  // deleteBoard(id: string): void {
  //   //리턴값을 주지 않을 때 void사용
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   //아이디로 보기권한상태 업데이트하기
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

}
