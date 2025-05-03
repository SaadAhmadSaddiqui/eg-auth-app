import React from "react";
import SignInForm from "./sign-in-form";
import { BACKEND_URL } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center">
			<h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
			<SignInForm />
			<Button variant="outline" className="w-full mt-4" asChild>
				<Link href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</Link>
			</Button>
		</div>
	);
};

export default SignInPage;
