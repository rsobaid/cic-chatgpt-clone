'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import logo from '../public/logo.png';

function Login() {
	return (
		<div className="bg-gray-800 h-screen flex flex-col items-center justify-center text-center">
			<Image
				src={logo}
				width={150}
				height={150}
				alt="logo"
			/>
			<button
				onClick={() => signIn('google')}
				className="text-white font-bold text-2xl animate-pulse p-5"
			>
				Sign In to use CIC Messenger
			</button>
		</div>
	);
}

export default Login;
