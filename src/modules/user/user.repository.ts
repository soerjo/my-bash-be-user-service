import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserDto } from './dto/find-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserRepository  {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto)
    return this.usersRepository.save(user)
  }

  findOneByUsernameOrEmail(usernameOrEmail: string) {
    return this.usersRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ],
    })
  }

  async findAll(dto: FindUserDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if(dto.username) {
      queryBuilder.andWhere('user.username = :username', { username: dto.username });
    }

    if(dto.email) {
      queryBuilder.andWhere('user.email = :email', { email: dto.email });
    }

    if(dto.phone) {
      queryBuilder.andWhere('user.phone = :phone', { phone: dto.phone });
    }

    if(dto.role_id) {
      queryBuilder.andWhere('user.role_id = :role_id', { role_id: dto.role_id });
    }

    queryBuilder.skip((dto.page - 1) * dto.take).take(dto.take)
  
    const [user, itemCount] = await queryBuilder.getManyAndCount()
    const data = user.map(user => instanceToPlain(user));

    const meta = {
      page: dto?.page,
      offset: dto?.take,
      itemCount,
      pageCount: Math.ceil(itemCount / dto?.take) ? Math.ceil(itemCount / dto?.take) : 0,
    };

    return { data, meta}
  }

  findOneById(id: number) {
    return this.usersRepository.findOne({ where: { id } })
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } })
  }

  update(id: number, dto: UpdateUserDto) {
    const existUser = this.findOneById(id)
    if(!existUser) throw new Error('User not found');

    const updateUserData = this.usersRepository.create({
        ...existUser,
        ...dto
    })

    return this.usersRepository.save(updateUserData)
  }

  remove(id: number) {
    const existUser = this.findOneById(id)
    if(!existUser) throw new Error('User not found');

    return this.usersRepository.softDelete(id)
  }
}
