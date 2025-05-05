import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "argon2";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { AuthJwtPayload } from "./types/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import { refreshJwtConfig } from "./config/refresh.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		@Inject(refreshJwtConfig.KEY) private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
	) {}

	async signup(createUserDto: CreateUserDto) {
		const user = await this.usersService.findByEmail(createUserDto.email);
		if (user) {
			throw new ConflictException(`User with email ${createUserDto.email} already exists`);
		}
		return this.usersService.create(createUserDto);
	}

	async signin(id: string, name?: string) {
		const { accessToken } = await this.generateTokens(id);

		return { id, name, accessToken };
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

	async generateTokens(id: string) {
		const payload: AuthJwtPayload = { sub: id };

		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, this.refreshJwtConfiguration),
		]);

		return { accessToken, refreshToken };
	}

	async validateJwtUser(id: string) {
		const user = await this.usersService.findOne(id);

		return { id: user.id };
	}
}
