import React, { useReducer, useState, useEffect } from 'react';
import { reducer, initialState, AppContext } from '../../../reducers/contents/contents';
import { useQueryClient } from "react-query";
import Title from './Title';
import TravelPeriod from './TravelPeriod';
import Accompany from './Accompany';
import Days from './Days';
import Currency from './Currency';
import Tag from './Tag';
import Thumbnail from './Thumbnail';
import Schedule from './Schedule';
import ShoppingList from './ShoppingList';
import Thoughts from './Thoughts';
import Precaution from './Precaution';
import Buggage from './Buggage';
import Depature from './Depature';
import { useGetContentDetail, useUpdateContentDetail, useDeleteContentDetail } from "../../../queries/ContentDetailQuery";

import GenericTemplate from '../../../components/templates/GenericTemplate';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		background: {
			default: '#f5f5f5',
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: 'white'
				}
			},
		},
	}
});

const EditContentDetailPage: React.VFC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isGotData, setIsGotData] = useState(false);
	const queryClient = useQueryClient();
	const getContentDetail = useGetContentDetail();
	const updateContentDetail = useUpdateContentDetail();
	const deleteContentDetail = useDeleteContentDetail();
	useEffect(() =>  {
		const url = new URL(window.location.href);
		getContentDetail.mutate({"postID": Number(url.searchParams.get('id'))});
	}, []);

	const contentDetail = (() => {
		if (getContentDetail.isSuccess) {
			return JSON.parse(JSON.stringify(getContentDetail.data)).data;
		}
	})();

	if (!isGotData && contentDetail) {
		setIsGotData(true);
		dispatch({
			type: 'set_created_content',
			payload: contentDetail,
		})
	}

	const handleUpdate = () => {
		const postParams = {
			ID: contentDetail.ID,
			userID: contentDetail.userID,
			title: state.title,
			fromDate: state.fromDate,
			toDate: state.toDate,
			nights: state.nights,
			days: state.days,
			accompanyPersonCategory: state.accompanyPersonCategory,
			numberOfPerson: state.numberOfPerson,
			budget: state.budget,
			currency: state.currency,
			thumbnail: state.thumbnail,
			thought: state.thought,
			depatureCountry: state.depatureCountry,
			depaturePrefecture: state.depaturePrefecture,
			depatureCity: state.depatureCity,
			tags: state.tags,
			createdAt: state.createdAt,
			precautions: state.precautions.filter(precaution => precaution.precaution !== '' || precaution.id !== 0),
			buggages: state.buggages.filter(buggage => buggage.name !== '' || buggage.id !== 0),
			shoppingLists: state.shoppingLists.filter(shoppingList => shoppingList.name !== '' || shoppingList.id !== 0),
			schedules: state.schedules
		};
		updateContentDetail.mutate(postParams);
	};

	const handleDelete = () => {
		deleteContentDetail.mutate({postID: contentDetail.ID});
	};

	let errorObject = '';
	if (updateContentDetail.isError) {
		errorObject = queryClient.getQueryData<any>('errorObject') || '';
	}

	return (
		<GenericTemplate title=''>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="lg">
					<CssBaseline />
					{getContentDetail.isSuccess && (
						<>
						{/* TODO: 全部共通ではなく分割したい */}
						<AppContext.Provider value={{ state, dispatch, errorObject }}>
							<Title />
							<TravelPeriod />
							<Days />
							<Accompany />
							<Currency />
							<Tag />
							<Thumbnail />
							<Precaution />
							<Buggage />
							<Depature />
							<Schedule />
							<ShoppingList />
							<Thoughts />
							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{ mt: 4 }}
								onClick={() => handleUpdate()}
							>
								更新
							</Button>
							<Button
								type="button"
								fullWidth
								color="error"
								variant="contained"
								sx={{ mt: 1, mb: 4 }}
								onClick={() => handleDelete()}
							>
								削除
							</Button>
						</AppContext.Provider>
						</>
					)}
				</Container>
			</ThemeProvider>
		</GenericTemplate>
	)
}

export default EditContentDetailPage