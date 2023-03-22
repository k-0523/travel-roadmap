import React, { useContext, useState, useMemo, useEffect }  from 'react';
import { AppContext } from '../../../../reducers/contents/contents';
import { usePostImage } from "../../../../queries/FileQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ImageListItem from "@mui/material/ImageListItem";
import Resizer from "react-image-file-resizer";

const Image: React.VFC<{index: number, detailIndex: number}> = ({index, detailIndex}) => {
    const { dispatch } = useContext(AppContext);
    const postImage = usePostImage();
    const [imagePathList, setImagePathList] = useState<{imagePath: string, isUploadNow: boolean}[]>([
        {
            imagePath: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            isUploadNow: false
        },
        {
            imagePath: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            isUploadNow: false
        },
        {
            imagePath: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            isUploadNow: false
        }
    ]);

    // S3が使えないためファイルアップロードはしない
    // const resizeFile = (file:any) =>
    //     new Promise((resolve) => {
    //         Resizer.imageFileResizer(
    //         file,
    //         520,
    //         340,
    //         "PNG",
    //         100,
    //         0,
    //         (uri) => {
    //             resolve(uri);
    //         },
    //         "file"
    //         );
    //     }
    // );

    // const setImagePath = async (e: React.ChangeEvent<HTMLInputElement>, imageIndex: number) => {
    //     if (!e.target.files) return;
    //     const imageFile = e.target.files[0];
    //     const image = await resizeFile(imageFile);
    //     postImage.mutate(image);
    //     setImagePathList([
    //         ...imagePathList.slice(0, imageIndex),
    //         {
    //             ...imagePathList[imageIndex],
    //             isUploadNow: true
    //         },
    //         ...imagePathList.slice(imageIndex + 1)
    //     ])
    // }

    // useEffect(() =>  {
    //     const imageIndex = imagePathList.findIndex((element) => element.isUploadNow === true);
    //     if (postImage.isSuccess && imageIndex !== -1) {
    //         const data = JSON.parse(JSON.stringify(postImage.data)).data
    //         setImagePathList([
    //             ...imagePathList.slice(0, imageIndex),
    //             {
    //                 ...imagePathList[imageIndex],
    //                 imagePath: data.signedUrl,
    //                 isUploadNow: false
    //             },
    //             ...imagePathList.slice(imageIndex + 1)
    //         ])
    //         dispatch({
    //             type: 'add_schedule_detail_images',
    //             payload: {
    //                 name: 'imagePath',
    //                 value: data.filePath,
    //                 index: index,
    //                 detailIndex: detailIndex,
    //                 imageIndex: imageIndex
    //             }
    //         })
    //     }
	// }, [postImage]);

    return useMemo(() => {
        return (
            <Box sx={{ my:5 }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs='auto'>
                        <label htmlFor={`upload-image-button-${index}-${detailIndex}-0`}>
                            <input
                                id={`upload-image-button-${index}-${detailIndex}-0`}
                                name='image'
                                accept="image/*"
                                multiple type="file"
                                style={{display: 'none'}}
                                // onChange={(e) => setImagePath(e, 0)}
                            />
                            {imagePathList[0].imagePath !== '' ? (
                                <ImageListItem sx={{ height: '160px', width: '280px' }}>
                                    <img src={imagePathList[0].imagePath} />
                                </ImageListItem>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color='inherit'
                                    component="span"
                                    sx={{ height: '160px', width: '280px' }}
                                >
                                    画像添付
                                </Button>
                            )}
                        </label>
                    </Grid>
                    <Grid item xs='auto'>
                        <label htmlFor={`upload-image-button-${index}-${detailIndex}-1`}>
                            <input
                                id={`upload-image-button-${index}-${detailIndex}-1`}
                                name='image'
                                accept="image/*"
                                multiple type="file"
                                style={{display: 'none'}}
                                // onChange={(e) => setImagePath(e, 1)}
                            />
                            {imagePathList[1].imagePath !== '' ? (
                                <ImageListItem sx={{ height: '160px', width: '280px' }}>
                                    <img src={imagePathList[1].imagePath} />
                                </ImageListItem>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color='inherit'
                                    component="span"
                                    sx={{ height: '160px', width: '280px' }}
                                >
                                    画像添付
                                </Button>
                            )}
                        </label>
                    </Grid>
                    <Grid item xs='auto'>
                        <label htmlFor={`upload-image-button-${index}-${detailIndex}-2`}>
                            <input
                                id={`upload-image-button-${index}-${detailIndex}-2`}
                                name='image'
                                accept="image/*"
                                multiple type="file"
                                style={{display: 'none'}}
                                // onChange={(e) => setImagePath(e, 2)}
                            />
                            {imagePathList[2].imagePath !== '' ? (
                                <ImageListItem sx={{ height: '160px', width: '280px' }}>
                                    <img src={imagePathList[2].imagePath} />
                                </ImageListItem>
                            ) : (
                                <Button
                                    variant="outlined"
                                    color='inherit'
                                    component="span"
                                    sx={{ height: '160px', width: '280px' }}
                                >
                                    画像添付
                                </Button>
                            )}
                        </label>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [dispatch, imagePathList]);
}

export default Image