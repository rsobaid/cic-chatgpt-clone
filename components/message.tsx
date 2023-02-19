import { DocumentData } from 'firebase/firestore';
import React from 'react';

type Props = {
	message: DocumentData | Message;
};

export default function Message({ message }: Props) {
	const isChatGPT = message.user.name === 'ChatGPT';

	return (
		<div className={`py-5 text-white ${isChatGPT && 'bg-gray-700/50'}`}>
			<div className="flex space-x-5 px-10 max-w-2xl mx-auto">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={
						message?.user?.avatar ||
						'https://www.freeiconspng.com/thumbs/human-icon-png/human-icon-png-png-20.png'
					}
					alt={message.user.name}
					className="w-8 h-8"
				/>
				<p className="pt-1 text-sm">{message.text}</p>
			</div>
		</div>
	);
}
