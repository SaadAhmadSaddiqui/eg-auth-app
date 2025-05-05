import React from "react";

import { getProfile } from "@/actions/profile";

const ProfilePage = async () => {
	const profile = await getProfile();

	return <div>{JSON.stringify(profile, null, 2)}</div>;
};

export default ProfilePage;
