import { IsNotEmpty, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `
      Passwords will contain at least 1 upper case letter
      Passwords will contain at least 1 lower case letter
      Passwords will contain at least 1 number or special character
      There is no length validation (min, max) in this regex!
    `,
  })
  password: string;
}
