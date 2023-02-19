'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import Modalselection from './model-selection';

type Props = {
	chatId: string;
};

function ChatInput({ chatId }: Props) {
	const [prompt, setPrompt] = useState('');
	const { data: session } = useSession();

	const { data: model } = useSWR('model', {
		fallbackData: 'text-davinci-003',
	});

	/**
	 * Send Message
	 */
	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!prompt) return;

		const input = prompt.trim();
		setPrompt('');

		const message: Message = {
			text: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar:
					session?.user?.image! ||
					`https://ui-avatars.com/api/?name=${session?.user?.name}`,
			},
		};

		await addDoc(
			collection(
				db,
				'users',
				session?.user?.email!,
				'chats',
				chatId,
				'messages',
			),
			message,
		);

		const notification = toast.loading('CIC Messenger is thinking...');

		// Fetch Ask Questions
		await fetch('/api/askQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: input,
				chatId,
				model,
				session,
			}),
		}).then(() => {
			toast.success('CIC Messenger has Responded!', {
				id: notification,
			});
		});
	};

	return (
		<div className="fixed bottom-0 w-full h-[200px] text-sm text-gray-400 bg-gray-900/50">
			<div className=" w-[300px] p-5">
				<p>Choose Model: </p>
				<Modalselection />
			</div>
			<form
				onSubmit={sendMessage}
				className="p-5 space-x-5 flex"
			>
				<input
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					type="text"
					className="bg-transparent focus:outline-none w-[150px] md:w-[400px] xl:w-[800px] 2xl:w-[1536px] disabled:cursor-not-allowed disabled:text-gray-300"
					placeholder="Type your message here..."
					disabled={!session}
				/>

				<button
					type="submit"
					disabled={!prompt || !session}
					className="bg-red-800 hover:opacity-50 text-white font-bold px-4 py-2 rounded disbaled:bg-gray-300 disabled:cursor-not-allowed"
				>
					<PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
				</button>
			</form>
		</div>
	);
}

export default ChatInput;
