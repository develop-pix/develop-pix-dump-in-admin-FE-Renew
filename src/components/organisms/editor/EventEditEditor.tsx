import { Box, Switch, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import { customColors } from '../../../styles';
import {
  DatePickerInput,
  EditorInput,
  HashTagInput,
  MultipleFileInput,
  SelectPhotoboothInput,
  TitleInput,
} from '../../molecules/input';

export interface IProps {
  title: string;
  photoboothName: string;
  images: string[];
  hashtag: string[];
  startDate: Date;
  endDate: Date;
  isPublic: boolean;

  setPhotoboothName: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  description: EditorState;
  setDescription: React.Dispatch<React.SetStateAction<EditorState>>;
  setHashtag: React.Dispatch<React.SetStateAction<string[]>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handlePublicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function EventEditEditor({
  title,
  photoboothName,
  setPhotoboothName,
  images,
  setImages,
  description,
  setDescription,
  hashtag,
  startDate,
  endDate,
  setHashtag,
  isPublic,
  handlePublicChange,
  setTitle,
}: IProps) {
  return (
    <Box
      sx={{
        width: 'auto',
        display: 'inline-block',
        overflow: 'hidden',
        border: '2px solid',
        borderColor: `${customColors.sub_pink}`,
        borderRadius: '0px 10px 10px 10px',
      }}
    >
      <Box
        sx={{
          margin: '50px 20px 50px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '70px',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            제목
          </Typography>
          <TitleInput input={title} setInput={setTitle} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            포토부스명
          </Typography>
          <SelectPhotoboothInput
            input={photoboothName}
            setInput={setPhotoboothName}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            이미지
          </Typography>
          <MultipleFileInput images={images} setImages={setImages} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            설명
          </Typography>
          <EditorInput input={description} setInput={setDescription} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            기간
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <DatePickerInput
              date={startDate}
              name="startDate"
              title="이벤트 시작 일"
            />
            <DatePickerInput
              date={endDate}
              name="endDate"
              title="이벤트 종료 일"
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            해시태그
          </Typography>
          <HashTagInput hashtag={hashtag} setHashtag={setHashtag} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            sx={{ width: '130px' }}
            fontSize={18}
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            공개여부
          </Typography>
          <Switch
            checked={isPublic}
            onChange={handlePublicChange}
            name="isPublic"
          />
        </Box>
      </Box>
    </Box>
  );
}
