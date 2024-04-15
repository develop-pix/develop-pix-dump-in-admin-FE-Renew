import { Box, Button } from '@mui/material';
import { VisuallyHiddenInput } from '../../../styles/reuse/Input.style';
import { customColors } from '../../../styles/base/Variable.style';

interface IProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MultipleFileInput({ images, setImages }: IProps) {
  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) {
      return;
    }
    if (images.length + files.length > 4) {
      alert('최대 4개 사진까지 첨부 할 수 있습니다.');
      return;
    }

    const fileReadAndPreview = (file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    };

    if (files) {
      [].forEach.call(files, fileReadAndPreview);
    }
  };

  const deleteImageHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    url: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const filterImage = images.filter((imageUrl) => imageUrl !== url);
    setImages(filterImage);
  };

  /* 사진 클릭시 대표사진 변경 */
  const setRepresentativeHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const representativeImage = images.filter((imageUrl) => imageUrl === url);
    const remainImage = images.filter((imageUrl) => imageUrl !== url);
    setImages(representativeImage.concat(remainImage));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {images?.map((url, index) => {
          return (
            <Button
              variant="outlined"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sx={[
                {
                  border: `2px solid ${customColors.white}`,
                  width: '200px',
                  minHeight: '200px',
                  padding: '0px',
                },
                {
                  '&:hover': { border: '2px solid blue' },
                },
              ]}
              onClick={(e) => setRepresentativeHandler(e, url)}
            >
              {index === 0 ? (
                <Box sx={{ width: '100%', height: '100%' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '0',
                      backgroundColor: 'blue',
                      padding: '3px 10px 3px 10px',
                      color: `${customColors.white}`,
                      borderRadius: '0px 0px 5px 0px',
                    }}
                  >
                    대표
                  </Box>
                  <Box
                    sx={[
                      {
                        position: 'absolute',
                        right: '0',
                        backgroundColor: 'red',
                        padding: '3px 10px 3px 10px',
                        color: `${customColors.white}`,
                        borderRadius: '0px 0px 0px 5px',
                      },
                      {
                        '&:hover': {
                          border: '1px solid white',
                        },
                      },
                    ]}
                    onClick={(e) => deleteImageHandler(e, url)}
                  >
                    X
                  </Box>
                  {/* alt 네이밍 수정 필요 */}
                  <img
                    width="100%"
                    height="100%"
                    src={url}
                    alt="representative-img"
                  />
                </Box>
              ) : (
                <Box sx={{ width: '100%', height: '100%' }}>
                  <Box
                    sx={[
                      {
                        position: 'absolute',
                        right: '0',
                        backgroundColor: 'red',
                        padding: '3px 10px 3px 10px',
                        color: `${customColors.white}`,
                        borderRadius: '0px 0px 0px 5px',
                      },
                      {
                        '&:hover': {
                          border: '1px solid white',
                        },
                      },
                    ]}
                    onClick={(e) => deleteImageHandler(e, url)}
                  >
                    X
                  </Box>
                  {/* alt 네이밍 수정 필요 */}
                  <img width="100%" height="100%" src={url} alt="normal-img" />
                </Box>
              )}
            </Button>
          );
        })}
      </Box>
      <Button component="label" variant="contained" sx={{ width: '200px' }}>
        이미지 업로드
        <VisuallyHiddenInput
          multiple
          name="images"
          type="file"
          accept="image/*"
          onChange={uploadImageHandler}
        />
      </Button>
    </Box>
  );
}
