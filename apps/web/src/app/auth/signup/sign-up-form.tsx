"use client";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "./actions";
import React, { useActionState } from "react";

const SignUpForm = () => {
	const [state, action] = useActionState(signUp, undefined);
	return (
		<form action={action}>
			<div className="flex flex-col gap-2">
				{state?.message && <p className="text-sm text-red-500">{state.message}</p>}
				<div>
					<Label htmlFor="name" className="mb-1">
						Name
					</Label>
					<Input id="name" name="name" placeholder="John Doe" />
				</div>
				{state?.error?.name && <p className="text-sm text-red-500">{state.error.name}</p>}

				<div>
					<Label htmlFor="email" className="mb-1">
						Email
					</Label>
					<Input id="email" name="email" placeholder="john@example.com" />
				</div>
				{state?.error?.email && <p className="text-sm text-red-500">{state.error.email}</p>}
				<div>
					<Label htmlFor="password" className="mb-1">
						Password
					</Label>
					<Input id="password" name="password" type="password" />
				</div>
				{state?.error?.password && (
					<div className="text-sm text-red-500">
						<p>Password must:</p>
						<ul>
							{state.error.password.map((error: any) => (
								<li key={error}>{error}</li>
							))}
						</ul>
					</div>
				)}
				<SubmitButton>Sign Up</SubmitButton>
			</div>
		</form>
	);
};

export default SignUpForm;
