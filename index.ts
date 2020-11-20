import { FizzBuzz } from './classes/fizzbuzz';
import { Interceptor } from './models/interceptor.model';

const newInterceptors: Interceptor[] = [
  {
    insteadOf: 3,
    say: 'Anan'
  },
  {
    insteadOf: 5,
    say: 'Zaa'
  },
  {
    insteadOf: 7,
    say: 'xD'
  },
  {
    insteadOf: 11,
    say: 'xD'
  },
];
const fb = new FizzBuzz(1156, newInterceptors);
fb.fb();
