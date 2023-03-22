import React, { Reducer, createContext } from 'react';

export type State = {
    ID: number;
	title: string;
    fromDate: string,
    toDate: string,
    nights: number,
    days: number,
    accompanyPersonCategory: number;
    numberOfPerson: number;
    budget: number;
    currency: number;
    thumbnail: string;
    thought: string;
    depatureCountry: string;
    depaturePrefecture: string;
    depatureCity: string;
    createdAt: string;
    tags: Array<{
        name: string
    }>;
    precautions: Array<{
        id: number,
        precaution: string
    }>;
    buggages: Array<{
        id: number,
        name: string
    }>;
    shoppingLists: Array<{
        id: number,
        name: string,
        memo: string
    }>;
    schedules: Array<{
        id: number,
        postID: number,
        day: number,
        travelArea: Array<{
            country: string,
            prefecture: string,
            city: string
        }>,
        scheduleDetails: Array<{
            id: number,
            scheduleID: number,
            time: string,
            transportation: number | null,
            title: string,
            place: string,
            url: string,
            content: string,
            dataStatus: number,
            scheduleDetailImages: Array<{
                imagePath: string,
                signedUrl: string
            }>
        }>
    }>;
};

export const initialState = {
    ID: 0,
    title: '',
    fromDate: '',
    toDate: '',
    nights: 0,
    days: 0,
    accompanyPersonCategory: 0,
    numberOfPerson: 0,
    budget: 0,
    currency: 0,
    thumbnail: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    thought: '',
    depatureCountry: '',
    depaturePrefecture: '',
    depatureCity: '',
    createdAt: '',
    tags: [{
        name: ''
    }],
    precautions: [{
        id: 0,
        precaution: ''
    }],
    buggages: [{
        id: 0,
        name: ''
    }],
    shoppingLists: [{
        id: 0,
        name: '',
        memo: ''
    }],
    schedules: [{
        id: 0,
        postID: 0,
        day: 1,
        travelArea: [{
            country: '',
            prefecture: '',
            city: ''
        }],
        scheduleDetails: [{
            id: 0,
            scheduleID: 0,
            time: '',
            transportation: null,
            title: '',
            place: '',
            url: '',
            content: '',
            dataStatus: 0,
            scheduleDetailImages: [
                { imagePath: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", signedUrl: '' },
                { imagePath: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", signedUrl: '' },
                { imagePath: "https://images.unsplash.com/photo-1522770179533-24471fcdba45", signedUrl: '' }
            ]
        }]
    }],
};

// Actionの型
type Action = {
	type:
        "change_value" |
        "update_precaution" |
        "add_new_precaution" |
        "update_shopping_list" |
        "add_new_shopping_list" |
        "add_schedules" |
        "add_schedule_details" |
        "change_schedule_details_value" |
        "update_buggage" |
        "add_new_buggage" |
        "delete_schedule_details" |
        "set_created_content" |
        "add_schedule_detail_images" |
        "add_travel_area" |
        "change_travel_area";
	payload: any;
    index?: number;
};

// reducer
export const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
        case "change_value":
            return { ...state, [action.payload.name]: action.payload.value };
        case "update_precaution": // 注意事項更新
            if (action.index === undefined) return state;
            return {
                ...state,
                precautions: [
                    ...state.precautions.slice(0, action.index),
                    {
                        ...state.precautions[action.index],
                        [action.payload.name]: action.payload.value
                    },
                    ...state.precautions.slice(action.index + 1)
                ]
            };
        case "add_new_precaution": // 注意事項追加
            if (action.index === undefined) return state;
            return {
                ...state,
                precautions: [
                    ...state.precautions,
                    {
                        precaution: action.payload
                    }
                ]
            };
        case "update_shopping_list": // 買い物リスト更新
            if (action.index === undefined) return state;
            return {
                ...state,
                shoppingLists: [
                    ...state.shoppingLists.slice(0, action.index),
                    {
                        ...state.shoppingLists[action.index],
                        [action.payload.name]: action.payload.value
                    },
                    ...state.shoppingLists.slice(action.index + 1)
                ]
            };
        case "add_new_shopping_list": // 買い物リスト追加
            if (action.index === undefined) return state;
            return {
                ...state,
                shoppingLists: [
                    ...state.shoppingLists,
                    {
                        name: action.payload
                    }
                ]
            };
        case "update_buggage": // 持ち物リスト更新
            if (action.index === undefined) return state;
            return {
                ...state,
                buggages: [
                    ...state.buggages.slice(0, action.index),
                    {
                        ...state.buggages[action.index],
                        [action.payload.name]: action.payload.value
                    },
                    ...state.buggages.slice(action.index + 1)
                ]
            };
        case "add_new_buggage": // 持ち物リスト追加
            if (action.index === undefined) return state;
            return {
                ...state,
                buggages: [
                    ...state.buggages,
                    {
                        name: action.payload
                    }
                ]
            };
        case "add_schedules": // スケジュール追加
            return {
                ...state,
                schedules: [
                    ...state.schedules,
                    {
                        day: action.payload.index + 1,
                        travelArea: [{
                            country: '',
                            prefecture: '',
                            city: ''
                        }],
                        scheduleDetails: [{
                            id: 0,
                            time: '',
                            transportation: null,
                            title: '',
                            place: '',
                            url: '',
                            content: '',
                            dataStatus: 0,
                            scheduleDetailImages: [
                                { imagePath: '' },
                                { imagePath: '' },
                                { imagePath: '' }
                            ]
                        }]
                    }
                ]
            };
        case "add_schedule_details": // スケジュール詳細追加
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        day: action.payload.index + 1,
                        scheduleDetails: [
                            ...state.schedules[action.payload.index].scheduleDetails,
                            {
                                ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex],
                                id: 0,
                                time: '',
                                transportation: 0,
                                title: '',
                                place: '',
                                url: '',
                                content: '',
                                dataStatus: 0,
                                scheduleDetailImages: [
                                    { imagePath: '' },
                                    { imagePath: '' },
                                    { imagePath: '' }
                                ]
                            }
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "change_schedule_details_value":
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        scheduleDetails: [
                            ...state.schedules[action.payload.index].scheduleDetails.slice(0, action.payload.detailIndex),
                            {
                                ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex],
                                [action.payload.name]: action.payload.value
                            },
                            ...state.schedules[action.payload.index].scheduleDetails.slice(action.payload.detailIndex + 1)
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "add_travel_area":
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        day: action.payload.index + 1,
                        travelArea: [
                            ...state.schedules[action.payload.index].travelArea,
                            {
                                ...state.schedules[action.payload.index].travelArea[action.payload.travelAreaIndex],
                                id: 0,
                                country: '',
                                prefecture: '',
                                city: ''
                            }
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "change_travel_area":
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        travelArea: [
                            ...state.schedules[action.payload.index].travelArea.slice(0, action.payload.travelAreaIndex),
                            {
                                ...state.schedules[action.payload.index].travelArea[action.payload.travelAreaIndex],
                                [action.payload.name]: action.payload.value
                            },
                            ...state.schedules[action.payload.index].travelArea.slice(action.payload.travelAreaIndex + 1)
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "delete_schedule_details":
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        scheduleDetails: [
                            ...state.schedules[action.payload.index].scheduleDetails.slice(0, action.payload.detailIndex),
                            ...state.schedules[action.payload.index].scheduleDetails.slice(action.payload.detailIndex + 1)
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "add_schedule_detail_images": // スケジュール詳細画像追加時処理
            return {
                ...state,
                schedules: [
                    ...state.schedules.slice(0, action.payload.index),
                    {
                        ...state.schedules[action.payload.index],
                        scheduleDetails: [
                            ...state.schedules[action.payload.index].scheduleDetails.slice(0, action.payload.detailIndex),
                            {
                                ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex],
                                scheduleDetailImages: [
                                    ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex].scheduleDetailImages.slice(0, action.payload.imageIndex),
                                    {
                                        ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex].scheduleDetailImages[action.payload.imageIndex],
                                        [action.payload.name]: action.payload.value
                                    },
                                    ...state.schedules[action.payload.index].scheduleDetails[action.payload.detailIndex].scheduleDetailImages.slice(action.payload.imageIndex + 1)
                                ]
                            },
                            ...state.schedules[action.payload.index].scheduleDetails.slice(action.payload.detailIndex + 1)
                        ]
                    },
                    ...state.schedules.slice(action.payload.index + 1),
                ]
            };
        case "set_created_content":
            return action.payload;
        default:
            return state;
	}
};

export const AppContext = createContext({} as {
    state: State
    dispatch: React.Dispatch<Action>
    errorObject: any
})