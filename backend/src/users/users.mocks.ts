// mocks.ts
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

export const createUserMock = new User({
  firstName: 'Johan',
  lastName: 'Bouguermouh',
  email: 'johan.bouguermouh@laplateforme.io',
  password: 'Test_1234!',
});

export const getOneUserMock = (): User =>
  new User({
    firstName: 'jhon',
    lastName: 'doe',
    email: 'jhondoe@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$WdkWc7aTOeVMpbg/NDK9nA$KcXXSN5Q7gy9AS8hFHnaEW7cX/2zyQpIMEua77QbREs',
  });

export const getAllUsersMock = (): User[] => [
  new User({
    firstName: 'jhon',
    lastName: 'doe',
    email: 'jhondoe@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$WdkWc7aTOeVMpbg/NDK9nA$KcXXSN5Q7gy9AS8hFHnaEW7cX/2zyQpIMEua77QbREs',
  }),
  new User({
    firstName: 'jane',
    lastName: 'doe',
    email: 'janedoe@mail.fr',
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$WdkWc7aTOeVMpbg/NDK9nA$KcXXSN5Q7gy9AS8hFHnaEW7cX/2zyQpIMEua77QbREs',
  }),
];

export const updateUserMock = (): UpdateUserDto =>
  new UpdateUserDto({
    email: 'jhondoeNew@mail.fr',
  });
