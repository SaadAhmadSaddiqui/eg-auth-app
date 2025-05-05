import { redirect, RedirectType } from "next/navigation";

import { deleteSession } from "@/actions/session";
import { BACKEND_URL } from "@/lib/constants";
import { authFetch } from "@/lib/utils/auth-fetch";

export async function GET() {
	const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
		method: "POST",
	});
	if (response.ok) {
	}
	await deleteSession();

	redirect("/", RedirectType.push);
}
