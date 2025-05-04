import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "argon2";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async signup(createUserDto: CreateUserDto) {
		const user = await this.usersService.findByEmail(createUserDto.email);
		if (user) {
			throw new ConflictException(`User with email ${createUserDto.email} already exists`);
		}
		return this.usersService.create(createUserDto);
	}

	async signin(createUserDto: CreateUserDto) {
		const user = await this.usersService.findByEmail(createUserDto.email);
		if (!user) {
			throw new ConflictException(`User with email ${createUserDto.email} does not exist`);
		}
		return user;
	}

	async validateLocalUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new UnauthorizedException("User not found.");
		}
		const isPasswordValid = verify(user.password, password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials.");
		}
		return { id: user.id, name: user.name };
	}
}
