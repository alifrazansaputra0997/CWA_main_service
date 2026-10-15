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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: `
        Minimal 8 karakter.
        Minimal 1 huruf kecil (a-z).
        Minimal 1 huruf besar (A-Z).
        Minimal 1 angka (0-9).
        Minimal 1 karakter spesial (@$!%*?&).
    `, 
  })
  password: string;
}
