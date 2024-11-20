// import PocketBase from 'pocketbase';
// import { serializeNonPOJOs } from '$lib/utils';
// import type { Handle } from '@sveltejs/kit';

// declare global {
// 	namespace App {
// 		interface Locals {
// 			pb: PocketBase;
// 			user?: any;
// 		}
// 	}
// }

// export const handle: Handle = async ({ event, resolve }) => {
// 	event.locals.pb = new PocketBase('http://pocketbase.blockflow.dev/') as PocketBase;
// 	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

// 	try {
// 		if (event.locals.pb.authStore.isValid) {
// 			await event.locals.pb.collection('users').authRefresh();
// 			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
// 		} else {
// 			throw new Error('Invalid auth token');
// 		}
// 	} catch (e) {
// 		event.locals.pb.authStore.clear();

// 		// Make a dummy account for the user
// 		const username = crypto.randomUUID();

// 		await event.locals.pb.collection('users').create({
// 			username: username,
// 			password: 'Password',
// 			passwordConfirm: 'Password',
// 			name: 'Guest'
// 		});

// 		await event.locals.pb.collection('users').authWithPassword(username, 'Password');

// 		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
// 	}

// 	const response = await resolve(event);

// 	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

// 	return response;
// };
