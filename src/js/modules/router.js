import { $, $$ } from './common.js';

export const routes = {}

export const createRoutes = () => {
	const parser = new DOMParser()

	$$('a').forEach( async a => {
		if (!a.href) return
		if (routes[a.href]) return
		if (!a.href.includes(`${location.protocol}//${location.hostname}`)) return

		const href = a.href
		const prev = a.onclick
		const response = await fetch(href)

		routes[href] = parser.parseFromString(await response.text(), 'text/html')
		a.onclick = () => {
			prev && prev()
			go(href)
		}
		a.removeAttribute("href")
	})

	addEventListener("popstate", ({ target }) => go(target.window.location.href))

	return routes
}

export const go = href => {
	const link = document.createElement('a')

	link.href = href

	$('head').innerHTML = routes[href].querySelector('head').innerHTML
	$('main').innerHTML = routes[href].querySelector('main').innerHTML

	link.hash
		? $(link.hash)?.scrollIntoView()
		: window.scroll(0, 0)
	
	history.pushState({}, "", href)
}
