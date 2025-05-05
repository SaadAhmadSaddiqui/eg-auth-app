import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { hash, verify } from "argon2";
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
		const newUser = await this.usersService.create(createUserDto);

		const { accessToken, refreshToken } = await this.generateTokens(newUser.id);

		const hashedRT = await hash(refreshToken);

		await this.usersService.updateHashedRefreshToken(newUser.id, hashedRT);

		return { id: newUser.id, name: newUser.name, accessToken, refreshToken };
	}

	async signin(id: string, name?: string) {
		const { accessToken, refreshToken } = await this.generateTokens(id);

		const hashedRT = await hash(refreshToken);

		await this.usersService.updateHashedRefreshToken(id, hashedRT);

		return { id, name, accessToken, refreshToken };
	}

	async getCurrentUser(id: string) {
		return await this.usersService.findOne(id);
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

	async validateRefreshToken(id: string, refreshToken: string) {
		const user = await this.usersService.findOne(id);

		const refreshTokenMatch = await verify(user.hashedRefreshToken, refreshToken);

		if (!refreshTokenMatch) throw new UnauthorizedException("Invalid refresh token");

		return { id: user.id };
	}

	async refreshToken(id: string, name: string) {
		const { accessToken, refreshToken } = await this.generateTokens(id);

		const hashedRT = await hash(refreshToken);
		await this.usersService.updateHashedRefreshToken(id, hashedRT);

		return { id, name, accessToken, refreshToken };
	}

	async signout(id: string) {
		await this.usersService.updateHashedRefreshToken(id, null);
	}
}
