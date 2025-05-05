import Link from "next/link";

import { getSession } from "@/actions/session";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export async function SiteHeader() {
	const session = await getSession();

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<h1 className="text-base font-medium">Documents</h1>
				<div className="ml-auto flex items-center gap-2">
					{session && session.user ? (
						<Button asChild variant="ghost" size="sm" className="hidden sm:flex cursor-pointer">
							<Link href="/api/auth/signout">Sign out</Link>
						</Button>
					) : null}
					<Button variant="ghost" asChild size="sm" className="hidden sm:flex">
						<Link href="https://github.com/SaadAhmadSaddiqui/eg-auth-app" rel="noopener noreferrer" target="_blank" className="dark:text-foreground">
							GitHub
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
