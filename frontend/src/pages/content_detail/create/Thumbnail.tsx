import React, { useState, useContext, useMemo, useEffect } from 'react';
import { AppContext } from '../../../reducers/contents/contents';
import { usePostImage } from "../../../queries/FileQuery";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageListItem from "@mui/material/ImageListItem";
import Resizer from "react-image-file-resizer";

const Thumbnail: React.VFC = () => {
    const { dispatch, errorObject } = useContext(AppContext)
    const postImage = usePostImage();
    const [imagePath, setImagePath] = useState<{imagePath: string, isUploadNow: boolean}>({imagePath: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6", isUploadNow: false});

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

    // const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.files) return;
    //     const imageFile = e.target.files[0];
    //     const image = await resizeFile(imageFile);
    //     postImage.mutate(image);
    //     setImagePath({...imagePath, isUploadNow: true});
    // }

    // useEffect(() =>  {
    //     if (postImage.isSuccess && imagePath.isUploadNow === true) {
    //         const data = JSON.parse(JSON.stringify(postImage.data)).data
    //         // setImagePath({imagePath: data.signedUrl, isUploadNow: false});

    //         dispatch({
    //             type: 'change_value',
    //             payload: {
    //                 name: 'thumbnail',
    //                 value: data.filePath,
    //             }
    //         })
    //     }
	// }, [postImage]);

    return useMemo(() => {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                    ◎サムネイル画像
                </Typography>
                {errorObject.hasOwnProperty('ImagePath') && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                        サムネイル画像は{errorObject['ImagePath']}
                    </Typography>
                )}
                <label htmlFor="upload-thumbnail-button">
                    <input
                        id='upload-thumbnail-button'
                        name='thumbnail'
                        accept="image/*"
                        multiple type="file"
                        style={{display: 'none'}}
                        // onChange={(e) => handleImage(e)}
                    />
                    {imagePath.imagePath ? (
                        <ImageListItem sx={{p:0.5, pb: 2, width: '30%', height: '160px', objectFit: 'cover'}}>
                            <img src={`${imagePath.imagePath}`} />
                        </ImageListItem>
                    ) : (
                        <Button
                            variant="outlined"
                            color='inherit'
                            component="span"
                            fullWidth
                            sx={{ height: '160px', width: '30%', }}
                        >
                            サムネイル用の画像添付
                        </Button>
                    )}
                </label>
            </Box>
        );
    }, [dispatch, imagePath]);
}

export default Thumbnail