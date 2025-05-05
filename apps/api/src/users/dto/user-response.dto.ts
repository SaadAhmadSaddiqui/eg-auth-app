import { Exclude, Expose } from "class-transformer";
import { IsDateString } from "class-validator";
import { TUser } from "../users.schema";

// Implementing IUser so that when a new field is added, we can see it in the IDE and make a decision on whether to add it to the DTO or not
@Exclude()
export class UserResponseDto implements TUser {
	@Expose()
	id: string;

	@Expose()
	email: string;

	@Expose()
	name: string;

	@Expose()
	@IsDateString()
	createdAt: Date;

	@Expose()
	@IsDateString()
	updatedAt: Date;

	@Exclude()
	password: string;

	@Exclude()
	hashedRefreshToken: string;
}
