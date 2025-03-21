import { BadRequestException, Injectable } from "@nestjs/common";
import { BankEntity } from "../entities/bank.entity";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { CreateBankDto } from "../dto/create-bank.dto";
import { bankGenerateCode } from "../../../utils/bank-code-generator.utils";
import { IJwtPayload } from "../../../common/interface/jwt-payload.interface";
import { decrypt } from "src/utils/encrypt.util";

@Injectable()
export class BankRepository extends Repository<BankEntity>{
  constructor(private readonly dataSource: DataSource) {
    super(BankEntity, dataSource.createEntityManager());
  }

    async createBankAccount (dto: CreateBankDto) {
      const lastBankAccount = await this.find({order: {id: 'DESC'}, take: 1});
      const lastId = lastBankAccount.length ? lastBankAccount[0].id : 0;
      const code = bankGenerateCode(lastId)
      const bank = this.create({...dto, code});
      return this.save(bank);
    }

    async findAll(dto: any, userPayload: IJwtPayload) {
        const queryBuilder = this.createQueryBuilder('bank');
        queryBuilder.select([
          'bank.id as id',
          'bank.name as name',
          'bank.code as code',
          'bank.province as province',
          'bank.regency as regency',
          'bank.district as district',
          'bank.village as village',
          'bank.address as address',
          'bank.postal_code as postal_code',
          'bank.phone as phone',
        ])
        // if(dto.username) {
        //   queryBuilder.andWhere('user.username ilike :username', { username: `%${dto.username}%` });
        // }
    
        // if(dto.email) {
        //   queryBuilder.andWhere('user.email ilike :email', { email: `%${dto.email}%` });
        // }
    
        // if(dto.role_id) {
        //   queryBuilder.andWhere('user.role_id = :role_id', { role_id: dto.role_id });
        // }
    
        queryBuilder.orderBy('bank.created_at', 'DESC')
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
          province: data.province ? decrypt(data.province) : '-',
          regency: data.regency ? decrypt(data.regency) : '-',
          district: data.district ? decrypt(data.district) : '-',
          village: data.village ? decrypt(data.village) : '-',
          address: data.address ? decrypt(data.address) : '-',
          postal_code: data.postal_code ? decrypt(data.postal_code) : '-',
          phone: data.phone ? decrypt(data.phone) : '-',
        }))
    
        return { data: processedData, meta}
      }
    
      findOneByIds(ids: number[]) {
        return this.find({ where: { id: In(ids) } });
      }

      getOneById(id: number, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(BankEntity) : this;
        return repo.findOne({ where: { id } });
      }

      findOneByOwnerId(ownerId: number) {
        return this.findOne({ where: { owner_id: ownerId } });
      }
    
      findOneByName(name: string) {
        return this.findOne({ where: { name } })
      }

      findOneByCode(code: string) {
        return this.findOne({ where: { code } })
      }

      async updateById(id: number, dto: any) {
        const existUser = await this.findOneById(id)
        if(!existUser) throw new BadRequestException('User not found');
    
        const updateUserData = this.create({
            ...existUser,
            ...dto
        })
        
        return this.save(updateUserData)
      }
    
      removeById(id: number) {
        const existUser = this.findOneById(id)
        if(!existUser) throw new BadRequestException('User not found');
    
        return this.softDelete(id)
      }
}