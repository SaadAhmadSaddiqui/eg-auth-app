import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type WithTimestamps } from "mongoose";

export type UserDocument = WithTimestamps<User>;

@Schema({ collection: "users", timestamps: true })
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
