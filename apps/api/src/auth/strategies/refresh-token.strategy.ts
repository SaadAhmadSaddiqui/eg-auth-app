import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { jwtConfig } from "../config/jwt.config";
import type { AuthJwtPayload } from "../types/jwt-payload.type";
import { refreshJwtConfig } from "../config/refresh.config";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
	constructor(
		@Inject(refreshJwtConfig.KEY)
		private refreshJwtConfiguration: ConfigType<typeof jwtConfig>,
		private authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
			secretOrKey: refreshJwtConfiguration.secret!,
			ignoreExpiration: false,
		});
	}

	validate(payload: AuthJwtPayload) {
		const userId = payload.sub;
		return this.authService.validateRefreshToken(userId);
	}
}
