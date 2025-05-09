"use client";
import React, { useActionState } from "react";

import Link from "next/link";

import { signIn } from "@/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInForm = () => {
	const [state, action] = useActionState(signIn, undefined);
	return (
		<form action={action}>
			<div className="flex flex-col gap-2">
				{state?.message && <p className="text-sm text-red-500">{state.message}</p>}
				<div>
					<Label htmlFor="email" className="mb-1">
						Email
					</Label>
					<Input id="email" name="email" placeholder="m@example.com" type="email" />
				</div>
				{state?.error?.email && <p className="text-sm text-red-500">{state.error.email}</p>}

				<div>
					<Label htmlFor="password" className="mb-1">
						Password
					</Label>
					<Input id="password" type="password" name="password" />
				</div>
				{state?.error?.password && <p className="text-sm text-red-500">{state.error.password}</p>}
				<Link className="text-sm underline" href="#">
					Forgot your password?
				</Link>

				<SubmitButton>Sign In</SubmitButton>
				<div className="flex justify-between text-sm">
					<span>
						Don&apos;t have an account?{" "}
						<Link className="text-sm underline" href="/auth/signup">
							Sign Up
						</Link>
					</span>
				</div>
			</div>
		</form>
	);
};

export default SignInForm;
