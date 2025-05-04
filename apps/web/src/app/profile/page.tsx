import { getProfile } from "@/actions/profile";
import React from "react";

const ProfilePage = async () => {
	const profile = await getProfile();

	console.log({ profile });

	return <div>{JSON.stringify(profile, null, 2)}</div>;
};

export default ProfilePage;
