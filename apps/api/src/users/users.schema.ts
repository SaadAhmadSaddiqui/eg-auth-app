import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument, WithTimestamps } from "mongoose";

export type UserDocument = WithTimestamps<HydratedDocument<User>>;

export type TUser = WithTimestamps<User> & { id: string };

@Schema({ collection: "users", timestamps: true })
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	hashedRefreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
