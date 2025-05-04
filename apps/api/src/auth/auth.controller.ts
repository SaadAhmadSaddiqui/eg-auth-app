import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { Request } from "express";

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
		return req.user;
	}
}
