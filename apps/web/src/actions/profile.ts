"use server";

import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/utils/auth-fetch";
import { User } from "@/types";

export const getProfile = async () => {
	const response = await authFetch(`${BACKEND_URL}/auth/me`);

	const result = await response.json();

	return result as User;
};
