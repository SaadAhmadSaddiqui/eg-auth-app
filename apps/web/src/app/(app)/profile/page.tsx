import React from "react";

import { getProfile } from "@/actions/profile";

const ProfilePage = async () => {
	const user = await getProfile();

	return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default ProfilePage;
