import { ConflictException, Injectable } from "@nestjs/common";
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
}
