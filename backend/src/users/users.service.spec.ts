import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn((x) => new User(x)),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('Methode create :', () => {
    /** ARRANGE */
    const createUserMock: User = new User({
      firstName: 'Johan',
      lastName: 'Bouguermouh',
      email: 'johan.bouguermouh@laplateforme.io',
      password: 'Test_1234!',
    });

    it('Password should be hashed', async () => {
      /** ARRANGE */
      const hashPassword = jest
        .spyOn(createUserMock, 'hashPassword')
        .mockResolvedValue();

      /** ACT **/
      await service.create(createUserMock);

      /** ASSERT **/
      expect(hashPassword).toHaveBeenCalled();
    });

    it('Should retrun User by create', async () => {
      /** ARRANGE */
      jest.spyOn(userRepository, 'save').mockResolvedValue(createUserMock);

      /** ACT **/
      const callCreateMethodService = async () => {
        return await service.create(createUserMock);
      };

      /** ASSERT **/
      expect(await callCreateMethodService()).toEqual(createUserMock);
    });
  });

  describe('Methode findAll :', () => {
    it('Should return an array of users', async () => {
      /** ARRANGE */
      const getAllUsersMock = [
        new User({
          firstName: 'jhon',
          lastName: 'doe',
          email: 'jhondoe@mail.fr',
          password: '*BA836B173CB7FD26F1683B52974AF4310BCAFC00',
        }),
        new User({
          firstName: 'jane',
          lastName: 'doe',
          email: 'janedoe@mail.fr',
          password: '*BA836B173CB7FD26F1683B52974AF4310BCAFC00',
        }),
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(getAllUsersMock);

      /** ACT **/
      const callFindAllMethodService = async () => {
        return await service.findAll();
      };

      /** ASSERT **/
      expect(await callFindAllMethodService()).toEqual(getAllUsersMock);
    });

    it('Should return an empty array', async () => {
      /** ARRANGE */
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);

      /** ACT **/
      const callFindAllMethodService = async () => {
        return await service.findAll();
      };

      /** ASSERT **/
      expect(await callFindAllMethodService()).toEqual([]);
    });
  });

  describe('Methode findOne :', () => {
    it('Should return a user', async () => {
      /** ARRANGE */
      const getOneUserMock = new User({
        firstName: 'jhon',
        lastName: 'doe',
        email: 'jhondoe@mail.fr',
        password: '*BA836B173CB7FD26F1683B52974AF4310BCAFC00',
      });

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(getOneUserMock);

      /** ACT **/
      const callFindOneMethodService = async () => {
        return await service.findOne(1);
      };

      /** ASSERT **/
      expect(await callFindOneMethodService()).toEqual(getOneUserMock);
    });

    it('Should return null', async () => {
      /** ARRANGE */
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      /** ACT **/
      const callFindOneMethodService = async () => {
        return await service.findOne(1);
      };

      /** ASSERT **/
      expect(await callFindOneMethodService()).toBeNull();
    });
  });

  describe('Methode update :', () => {
    it('Should return an object', async () => {
      /** ARRANGE */
      const updateUserMock = new UpdateUserDto({
        email: 'jhondoeNew@mail.fr',
      });

      const updateResultMock: UpdateResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(userRepository, 'update').mockResolvedValue(updateResultMock);

      /** ACT **/
      const callUpdateMethodService = async () => {
        return await service.update(1, updateUserMock);
      };

      /** ASSERT **/
      expect(await callUpdateMethodService()).toEqual(updateResultMock);
    });
  });

  describe('Methode remove :', () => {
    it('Should return an object', async () => {
      /** ARRANGE */
      const removeResultMock = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(userRepository, 'delete').mockResolvedValue(removeResultMock);

      /** ACT **/
      const callRemoveMethodService = async () => {
        return await service.remove(1);
      };

      /** ASSERT **/
      expect(await callRemoveMethodService()).toEqual(removeResultMock);
    });
  });
});
