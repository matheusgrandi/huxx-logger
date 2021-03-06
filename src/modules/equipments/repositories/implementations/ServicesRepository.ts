import { Repository } from 'typeorm';
import { dataSource } from '../../../../database';
import { ICreateServiceDTO } from '../../dtos/ICreateServiceDTO';
import { Service } from '../../entities/Service';
import { IServicesRepository } from '../IServicesRepository';

class ServicesRepository implements IServicesRepository {
  private repository: Repository<Service>;
  constructor() {
    this.repository = dataSource.getRepository(Service);
  }
  async create({
    id,
    user_id,
    name,
    description,
    manufacturer,
    endpoint,
    username,
    password,
  }: ICreateServiceDTO): Promise<void> {
    const user = this.repository.create({
      id,
      user_id,
      name,
      description,
      manufacturer,
      endpoint,
      username,
      password,
    });

    await this.repository.save(user);
  }

  async findByName(name: string, user_id: string): Promise<Service | null> {
    const service =
      name || user_id !== (null || undefined)
        ? await this.repository.findOneBy({ name, user_id })
        : null;
    return service;
  }

  async findById(id: string): Promise<Service | null> {
    const service =
      id !== (null || undefined)
        ? await this.repository.findOneBy({ id })
        : null;
    return service;
  }

  async listByUserId(id: string): Promise<Service[]> {
    const services = await this.repository.find({
      where: {
        user_id: id,
      },
    });
    return services;
  }
}

export { ServicesRepository };
