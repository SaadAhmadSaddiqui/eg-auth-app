import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { hash } from "argon2";
import { UserResponseDto } from "./dto/user-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(body: CreateUserDto) {
		try {
			const { password, ...rest } = body;

			const hashedPassword = await hash(password);

			const createdUser = new this.userModel({ ...rest, password: hashedPassword });
			const user = await createdUser.save();

			if (!user) {
				throw new Error("User was not created");
			}

			return plainToInstance(UserResponseDto, user);
		} catch (error) {
			throw new InternalServerErrorException(`Error creating user: ${error.message}`);
		}
	}

	async findByEmail(email: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ email }).exec();
	}

	async findOne(id: string): Promise<UserDocument> {
		const user = await this.userModel.findOne({ _id: id }).exec();

		if (!user) {
			throw new NotFoundException(`User with email id:${id} not found `);
		}
		return user;
	}

	async findAll(): Promise<UserResponseDto[]> {
		const users = await this.userModel.find();

		return users.map((user) => plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }));
	}

	async update(id: string, body: UpdateUserDto): Promise<UserDocument> {
		const user = await this.userModel.findByIdAndUpdate(id, body, { new: true }).exec();

		if (!user) {
			throw new NotFoundException(`User with id:${id} not found `);
		}
		return user;
	}

	async remove(id: string): Promise<void> {
		await this.userModel.deleteOne({ _id: id });
	}
}
