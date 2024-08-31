import Sinon from 'sinon';
import { MockTypeORM } from 'mock-typeorm';
import { dataSource } from '../database/datasource';
import { User } from './entities/user.entity';

describe('Testing User Repository of TypeORM', () => {
  let typeorm: MockTypeORM;

  beforeEach(() => {
    typeorm = new MockTypeORM();
  });

  afterEach(() => {
    typeorm.restore();
  });

  it('find()', async () => {
    const mockUsers = ['user'];
    typeorm.onMock('User').toReturn(mockUsers, 'find');

    const users = await dataSource.getRepository(User).find();

    expect(users).toEqual(mockUsers);
  });

  it('findOne()', async () => {
    const mockUser = 'user';
    typeorm.onMock('User').toReturn(mockUser, 'findOne');

    const user = await dataSource
      .getRepository(User)
      .findOne({ where: { id: 1 } });

    expect(user).toEqual(mockUser);
  });

  it('save()', async () => {
    typeorm.onMock(User).toReturn({ id: 'newId' }, 'save');

    const user = dataSource.manager.create(User, { id: 1 });
    const savedUser = await dataSource.manager.save(user);

    expect(savedUser).toEqual({ id: 'newId' });
  });

  it('remove()', async () => {
    typeorm.onMock(User).toReturn({ id: 'newId' }, 'remove');

    const user = dataSource.manager.create(User, { id: 1 });
    const removedUser = await dataSource.manager.remove(user);

    expect(removedUser).toEqual({ id: 'newId' });
  });

  it('update()', async () => {
    typeorm.onMock(User).toReturn({ id: 'newId' }, 'update');

    const user = dataSource.manager.create(User, { id: 1 });
    const updatedUser = await dataSource.manager.update(User, { id: 1 }, user);

    expect(updatedUser).toEqual({ id: 'newId' });
  });
});
