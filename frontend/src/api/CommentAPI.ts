import { API } from "./BaseAPI";

const getCountComments = async (postID:number) => {
	const data = await API.post<string>(
        "/api/v1/comment/count",
		{"postID": postID}
	).then((response) => response.data)
	return data
}

const getComments = async (postID:number) => {
	const data = await API.get<string>(
        "/api/v1/comment/list?post_id=" + postID
	).then((response) => response.data)
	return data
}

const submitComment = async (params:any) => {
	const data = await API.post<string>(
        "/api/v1/comment/create",
		params
	).then((response) => response.data)
	return data
}

export {getCountComments, getComments, submitComment}