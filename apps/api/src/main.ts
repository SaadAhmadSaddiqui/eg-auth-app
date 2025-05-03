import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import helmet from "helmet";
import * as compression from "compression";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// register all plugins and extension
	app.enableCors({ origin: "*" });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);
	app.enableVersioning({ type: VersioningType.URI });
	app.use(helmet());
	app.use(compression());

	await app.listen(PORT, () => {
		console.log(`🚀 Application running at port ${PORT}`);
	});
}

bootstrap().catch((err) => {
	console.error("Error starting the application", err);
	process.exit(1);
});
