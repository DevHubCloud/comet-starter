import { User } from '@src/types/user';
import { atom } from 'recoil';

const signedIn = atom({
  key: 'signedIn',
  default: false,
});

const currentUser = atom<User>({
  key: 'currentUser',
  default: undefined,
});

export { currentUser, signedIn };
