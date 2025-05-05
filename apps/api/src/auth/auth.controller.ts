import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth/jwt-auth.guard";

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
	@Get("protected")
	protected(@Req() req: Request) {
		return { message: `This is a protected route. Should be able to call without a token. User id: ${(req as any).user.id}` };
	}
}
