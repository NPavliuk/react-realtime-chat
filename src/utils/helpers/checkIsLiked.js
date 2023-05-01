
export const checkIsLiked = (arr, uid) => {
	return arr.filter(id => uid === id).length > 0
}
