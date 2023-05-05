export const checkLocationParent = (path, route) => {
	return path.split('/')[1] === route.split('/')[1]
}
