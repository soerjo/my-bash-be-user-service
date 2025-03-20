import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBankDto } from '../dto/create-bank.dto';
import { UpdateBankDto } from '../dto/update-bank.dto';
import { BankRepository } from '../repositories/bank.repository';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    private readonly bankRepository: BankRepository,
  ) {}

  async createBank(dto: CreateBankDto) {
    const isNameExist = await this.bankRepository.findOneByName(dto.name);
    if(isNameExist) throw new BadRequestException('Bank name already exists');

    const isAlreadyHaveBank = await this.bankRepository.findOneByOwnerId(dto.owner_id);
    if(isAlreadyHaveBank) throw new BadRequestException('User already have bank');

    return this.bankRepository.createBankAccount(dto);
  }

  
  findAll(dto: any & PaginationDto, user: IJwtPayload) {
    return this.bankRepository.findAll(dto, user);
  }

  findByIds(id: number[]) {
    return this.bankRepository.findOneByIds(id);
  }

  findOneById(id: number, manager?: EntityManager) {
    return this.bankRepository.getOneById(id, manager);
  }

  findOneByName(name: string) {
    return this.bankRepository.findOneByName(name+"_bank");
  }

  findOneByCode(code: string) {
    return this.bankRepository.findOneByCode(code);
  }

  update(id: number, updateBankDto: UpdateBankDto) {
    return `This action updates a #${id} bank`;
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  }

}
