import { Interceptor } from '../models/interceptor.model';

export class FizzBuzz {
  private static readonly index = 0;

  constructor(
    private endAt = 150,
    private interceptors: Interceptor[] = [
      {
        insteadOf: 3,
        say: 'Fizz'
      },
      {
        insteadOf: 5,
        say: 'Buzz'
      },
    ]
  ) {
    if (endAt > 500000) {
      throw Error('That\'s too much!');
    }
  }

  private findFactors(num: number): number[] {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }

    return factors;
  }

  private validateInterceptors(): string[] {
    const errors: string[] = [];

    if (!(this.interceptors.length > 0)) {
      errors.push('There is no interceptor.');
    }

    const numbers = this.interceptors.map(i => i.insteadOf);
    for (const num of numbers) {
      if (this.findFactors(num).length > 2) {
        errors.push(`Interceptors should only contain prime numbers. This value is not prime: ${num}`);
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] === numbers[j]) {
          errors.push(`There are duplicate numbers in interceptors.\n    - Indexes: ${i} and ${j}\n    - Duplicated value: ${numbers[i]}`);
        }
      }
    }

    return errors;
  }

  fb(): void {
    const errors = this.validateInterceptors();
    if (errors.length > 0) {
      console.error(`Validation error(s)\n  ${errors.join('\n  ')}`);
      return;
    }

    let iterator = FizzBuzz.index;
    while (true) {
      if (iterator === this.endAt) {
        break;
      }
      iterator++;
      const localInterceptors = this.interceptors.filter(i => this.findFactors(iterator).includes(i.insteadOf));

      if (localInterceptors.length > 0) {
        console.log(localInterceptors.map(i => i.say).join(''));
      } else {
        console.log(iterator.toString());
      }
    }
  }
}
