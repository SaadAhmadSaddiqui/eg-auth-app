import React from "react";

import Link from "next/link";

import SignUpForm from "./sign-up-form";

const SignUpPage = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center">
			<h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>
			<SignUpForm />
			<div className="flex justify-between text-sm mt-4">
				<span>
					Already have an account?{" "}
					<Link className="underline" href={"/auth/signin"}>
						Sign In
					</Link>
				</span>
			</div>
		</div>
	);
};

export default SignUpPage;
