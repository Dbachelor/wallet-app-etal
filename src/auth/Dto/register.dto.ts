import { IsAlphanumeric, IsNotEmpty, IsString, isString } from "class-validator";

export class RegisterDTO{
    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

}