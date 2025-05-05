/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { getSession } from "@/actions/session";
import { EGLogo } from "@/components/svgs/eg-logo";
import { Button } from "@/components/ui/button";

export default async function Home() {
	const session = await getSession();

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="border-b border-gray-200">
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<EGLogo />
					{!session || !session.user ? (
						<Button asChild variant="outline">
							<Link href="/auth/signin">Login</Link>
						</Button>
					) : (
						<div className="flex gap-2">
							<Button asChild variant="outline">
								<Link href="/dashboard">Dashboard</Link>
							</Button>
							<Button asChild variant="outline" className="cursor-pointer">
								<Link href="/api/auth/signout">Sign out</Link>
							</Button>
						</div>
					)}
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1">
				<section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
					<div className="md:w-1/2 space-y-6">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Create engaging learning experiences</h1>
						<p className="text-lg text-gray-600">
							Easy Generator is an e-learning authoring tool that empowers you to create interactive courses without any technical knowledge. This demo
							showcases our authentication system.
						</p>
						<div className="pt-4">
							<Button asChild size="lg">
								<Link href={session ? "/dashboard" : "/auth/signup"}>Get Started</Link>
							</Button>
						</div>
					</div>
					<div className="md:w-1/2">
						<img
							src="https://www.easygenerator.com/wp-content/uploads/2024/07/D2C_Homepage.png"
							alt="Easy Generator Learning Platform"
							className="rounded-lg"
						/>
					</div>
				</section>
			</main>
		</div>
	);
}
