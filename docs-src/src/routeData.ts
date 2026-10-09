import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// The docs are a single page, so the left sidebar would only ever hold one
// link. Drop it everywhere (keeping the right-hand "On this page" table of
// contents) and let the content use the full width. With no sidebar, Starlight
// also stops rendering the mobile sidebar toggle, which we no longer need.
export const onRequest = defineRouteMiddleware((context) => {
	context.locals.starlightRoute.hasSidebar = false;
});
