/* eslint-disable import/no-cycle */
import { Box } from '@mui/material';
import { EventEditEditor, EventEditForm, Sidebar } from '../../components';
import useEventEditPage from './EventEditPage.hook';

export default function EventEditPage() {
  const { state, action } = useEventEditPage();
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <EventEditForm
        onSubmitHandler={action.onSubmitHandler}
        goPrevRoute={action.goPrevRoute}
      >
        <EventEditEditor
          title={state.title}
          photoboothName={state.photoboothName}
          images={state.images}
          description={state.description}
          hashtag={state.hashtag}
          startDate={state.startDate}
          endDate={state.endDate}
          isPublic={state.isPublic}
          setPhotoboothName={action.setPhotoboothName}
          setImages={action.setImages}
          setDescription={action.setDescription}
          setHashtag={action.setHashtag}
          handlePublicChange={action.handlePublicChange}
          setTitle={action.setTitle}
        />
      </EventEditForm>
    </Box>
  );
}
