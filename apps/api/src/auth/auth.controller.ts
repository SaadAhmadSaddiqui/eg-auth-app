import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth/jwt-auth.guard";
import { RefreshAuthGuard } from "./guards/refresh-auth/refresh-auth.guard";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "src/users/dto/user-response.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post("signup")
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signup(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post("signin")
	signin(@Req() req: Request) {
		const user: { id: string; name: string } = req.user as any;
		return this.authService.signin(user.id, user.name);
	}

	@UseGuards(JwtAuthGuard)
	@Get("me")
	async protected(@Req() req: Request) {
		const user = await this.authService.getCurrentUser((req.user as any)?.id);
		return plainToInstance(UserResponseDto, user);
	}

	@UseGuards(RefreshAuthGuard)
	@Post("refresh")
	refreshToken(@Req() req: Request) {
		const user: { id: string; name: string } = req.user as any;
		return this.authService.refreshToken(user.id, user.name);
	}

	@UseGuards(JwtAuthGuard)
	@Post("signout")
	signout(@Req() req: Request) {
		return this.authService.signout((req.user as any).id);
	}
}
