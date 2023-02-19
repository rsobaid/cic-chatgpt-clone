import ClientProvider from '@/components/client-provider';
import Login from '@/components/login';
import SessionProvider from '@/components/session-provider';
import SideBar from '@/components/sidebar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html>
			<head />
			<body>
				<SessionProvider session={session}>
					{!session ? (
						<Login />
					) : (
						<div className="flex">
							<div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
								<SideBar />
							</div>
							<ClientProvider />
							<div className="flex-1 bg-black">{children}</div>
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
