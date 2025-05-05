import { Logger } from "@nestjs/common";
import * as morgan from "morgan";

export function useRequestLogging(app) {
	const logger = new Logger("Request");
	app.use(
		morgan("dev", {
			stream: {
				write: (message) => logger.log(message.replace("\n", "")),
			},
		}),
	);
}
