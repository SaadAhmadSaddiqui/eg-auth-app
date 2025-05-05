"use server";

import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/utils/auth-fetch";

export const getProfile = async () => {
	const response = await authFetch(`${BACKEND_URL}/auth/protected`);

	const result = await response.json();

	return result;
};
