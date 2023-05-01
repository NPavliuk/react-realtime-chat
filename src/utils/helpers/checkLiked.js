export const checkLiked = (arr, uid) => {
	return arr.filter(id => uid === id).length > 0
}
