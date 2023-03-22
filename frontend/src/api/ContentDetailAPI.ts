import { API } from "./BaseAPI";

const createContentDetail = async (params:any) => {
	const data = await API.post<string>(
        "/api/v1/content-detail/create",
		JSON.stringify(params)
	).then((response) => response.data)
	return data
}

const getContentDetail = async (params:any) => {
	const data = await API.post<string>(
        "/api/v1/content-detail/view",
        params
    ).then((response) => response.data)
	return data
}

const updateContentDetail = async (params:any) => {
	const data = await API.post<string>(
        "/api/v1/content-detail/update",
		JSON.stringify(params)
	).then((response) => response.data)
	return data
}

const deleteContentDetail = async (params:any) => {
	const data = await API.post<string>(
        "/api/v1/content-detail/delete",
        params
	).then((response) => response.data)
	return data
}
export {createContentDetail, getContentDetail, updateContentDetail, deleteContentDetail}