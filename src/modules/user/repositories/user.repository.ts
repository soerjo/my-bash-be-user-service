import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FindUserDto } from '../dto/find-user.dto';
import { IJwtPayload } from '../../../common/interface/jwt-payload.interface';
import { RoleEnum } from '../../../common/constant/role.constant';
import { decrypt, staticDecrypt, staticEncrypt } from 'src/utils/encrypt.util';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  // constructor(
  //   @InjectRepository(UserEntity)
  //   private usersRepository: Repository<UserEntity>,
  // ) {}

  createUser(dto: CreateUserDto, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    const user = repo.create(dto)
    return repo.save(user)
  }

  findOneByUsernameOrEmail(usernameOrEmail: string, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    return repo.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ],
    })
  }

  async findAll(dto: FindUserDto, userPayload: IJwtPayload, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    const queryBuilder = repo.createQueryBuilder('user');
    queryBuilder.andWhere('user.role_id > :userRoleId', { userRoleId: userPayload.role_id });
    queryBuilder.leftJoinAndSelect('user.role', 'role');
    queryBuilder.select([
      'user.id as id',
      'user.name as name',
      'user.username as username',
      'user.email as email',
      'user.phone as phone',
      'user.bank_id as bank_id',
      'role.name as role',
      `case 
        when user.temp_password IS NULL OR user.temp_password = '' then false 
        else true 
      end as is_reset_password`,
    ])

    if(![RoleEnum.SUPER_ADMIN, RoleEnum.SYSTEM_ADMIN].includes(userPayload.role_id)) {
      queryBuilder.andWhere('user.bank_id = :bank_id', { bank_id: userPayload.bank_id });
    }

    if(dto.username) {
      queryBuilder.andWhere('user.username ilike :username', { username: `%${dto.username}%` });
    }

    if(dto.email) {
      queryBuilder.andWhere('user.email ilike :email', { email: `%${dto.email}%` });
    }

    if(dto.role_id) {
      queryBuilder.andWhere('user.role_id = :role_id', { role_id: dto.role_id });
    }

    queryBuilder.orderBy('user.created_at', 'DESC')
    queryBuilder.skip((dto.page - 1) * dto.take).take(dto.take)
  
    const queryItemCount = queryBuilder.getCount()
    const queryUser = queryBuilder.getRawMany()
    const [itemCount, rawData] = await Promise.all([queryItemCount, queryUser])

    const meta = {
      page: dto?.page,
      offset: dto?.take,
      itemCount,
      pageCount: Math.ceil(itemCount / dto?.take) ? Math.ceil(itemCount / dto?.take) : 0,
    };

    const processedData = rawData.map(data => ({
      ...data, 
      email: data.phone ? staticDecrypt(data.email) : null,
      phone: data.phone ? decrypt(data.phone) : null,
    }))
    
    return { data: processedData, meta}
  }

  findOneById(id: number, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    return repo.findOne({ where: { id } })
  }

  findOneByUsername(username: string, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    return repo.findOne({ where: { username } })
  }

  async updateUser(id: number, dto: UpdateUserDto, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    const existUser = await this.findOneById(id, manager)
    if(!existUser) throw new BadRequestException('User not found');

    const updateUserData = repo.create({
        ...existUser,
        ...dto
    })

    return repo.save(updateUserData)
  }

  removeUser(id: number, manager?: EntityManager) {
    const repo = manager ? manager.getRepository(UserEntity) : this;
    const existUser = this.findOneById(id, manager)
    if(!existUser) throw new BadRequestException('User not found');

    return repo.softDelete(id)
  }
}
