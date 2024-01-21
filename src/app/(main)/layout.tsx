import { MainLayout } from "@/features/main-layout"

export default function BaseLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <MainLayout>{children}</MainLayout>
}
