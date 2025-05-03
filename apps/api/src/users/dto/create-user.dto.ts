import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
	@IsString()
	name: string;

	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	email: string;

	@IsStrongPassword({
		minLength: 8,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;
}
