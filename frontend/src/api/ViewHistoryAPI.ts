import { API } from "./BaseAPI";

const getViewHistories = async () => {
	const data = await API.get<string>(
        "/api/v1/view-history/list"
    ).then((response) => response.data)
	return data
}

export {getViewHistories}