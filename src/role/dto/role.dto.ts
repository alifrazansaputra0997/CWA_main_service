import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateRoleDto{
    @IsNotEmpty()
    @MaxLength(35)
    roleName: string;

    @IsNotEmpty()
    @MaxLength(200)
    description: string;
}

export class paramRoleDto{
    @IsOptional()
    roleName: string;

    @IsOptional()
    roleCode: string;
}