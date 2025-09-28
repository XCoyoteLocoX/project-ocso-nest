import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string 

    @ApiProperty({
        default: "23467895"
    })
    @IsString()
    @MinLength(8)
    userPassword: string
}