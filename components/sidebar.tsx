'use client';

import { useSession, signOut } from 'next-auth/react';
import NewChat from './newchat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './chat-rows';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';
import Modalselection from './model-selection';

function SideBar() {
	const { data: session } = useSession();

	const [chats, loading, error] = useCollection(
		session &&
			query(
				collection(db, 'users', session.user?.email!, 'chats'),
				orderBy('createdAt', 'asc'),
			),
	);

	return (
		<div className="p-2 flex flex-col h-screen">
			{/* Logo */}
			<div className="mx-auto mb-4">
				<Link href={'/'}>
					<Image
						src={logo}
						alt="logo"
						className="mb-2 mx-auto hover:opacity-50"
						width={150}
						height={150}
					/>
				</Link>
			</div>

			{/* Chat Infos */}
			<div className="flex-1">
				<div>
					<NewChat />
					{/* <div className="hidden sm:inline">
						<Modalselection />
					</div> */}
					<div className="flex flex-col my-2 mt-4 space-y-2">
						{loading && (
							<div className="text-center text-white animate-pulse">
								<p>Loading Chats...</p>
							</div>
						)}

						{chats?.docs?.map((chat) => (
							<ChatRow
								key={chat.id}
								id={chat.id}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Profile */}
			{session && (
				/* eslint-disable @next/next/no-img-element */
				<img
					onClick={() => signOut()}
					src={
						session.user?.image! ||
						'https://www.freeiconspng.com/thumbs/human-icon-png/human-icon-png-png-20.png'
					}
					alt={session?.user?.name!}
					className="h-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
				/>
			)}
		</div>
	);
}

export default SideBar;
