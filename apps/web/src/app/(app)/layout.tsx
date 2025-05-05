import React, { PropsWithChildren, Suspense } from "react";

import { getProfile } from "@/actions/profile";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const AppLayout = async ({ children }: PropsWithChildren) => {
	const profile = await getProfile();

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" user={profile} />
			<SidebarInset>
				<SiteHeader />
				<Suspense fallback={<Skeleton className="w-full h-100" />}>{children}</Suspense>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default AppLayout;
