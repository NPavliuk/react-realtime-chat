export const createAndDispatchFocusEvent = () => {
	const event = new CustomEvent('focus-editor')
	document.dispatchEvent(event)
}
