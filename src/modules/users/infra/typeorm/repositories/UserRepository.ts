import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepositorysRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepositorysRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  /**
   * findById
   */
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  /**
   * findByEmail
   */
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  /**
   * create
   */
  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  /**
   * save / update
   */
  public save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
