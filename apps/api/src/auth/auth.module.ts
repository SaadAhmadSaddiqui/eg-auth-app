import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { jwtConfig } from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { refreshJwtConfig } from "./config/refresh.config";
import { RefreshStrategy } from "./strategies/refresh-token.strategy";

@Module({
	imports: [UsersModule, JwtModule.registerAsync(jwtConfig.asProvider()), ConfigModule.forFeature(jwtConfig), ConfigModule.forFeature(refreshJwtConfig)],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
