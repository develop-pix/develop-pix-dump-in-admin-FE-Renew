/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@mui/material';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { customColors } from '../../../styles/base/Variable.style';

interface IProps {
  input: EditorState;
  setInput: React.Dispatch<React.SetStateAction<EditorState>>;
}

export default function EditorInput({ input, setInput }: IProps) {
  const onEditorStateChange = (editorState: EditorState) => {
    setInput(editorState);
  };

  return (
    <Box
      sx={{
        border: `1px solid ${customColors.grey} `,
        borderRadius: '5px',
        padding: '30px',
        width: '40vw',
        height: '300px',
        overflow: 'scroll',
      }}
    >
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ['inline', 'fontSize', 'colorPicker', 'list', 'link'],
        }}
        placeholder="내용을 작성해주세요."
        localization={{
          locale: 'ko',
        }}
        editorState={input}
        onEditorStateChange={onEditorStateChange}
      />
    </Box>
  );
}
