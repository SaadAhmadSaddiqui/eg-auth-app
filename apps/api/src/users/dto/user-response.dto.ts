import { Exclude, Expose, Transform } from "class-transformer";
import { IsDateString } from "class-validator";

export interface IUser {
	_id: string;
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

// Implementing IUser so that when a new field is added, we can see it in the IDE and make a decision on whether to add it to the DTO or not
export class UserResponseDto implements IUser {
	@Expose()
	@Transform(({ obj }) => obj._id)
	_id: string;

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
}
