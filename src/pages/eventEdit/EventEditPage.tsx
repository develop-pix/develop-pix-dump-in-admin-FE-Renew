import { EventEdit, SidebarLayout } from '../../components';
import useEventEditPage from './EventEditPage.hook';

export default function EventEditPage() {
  const { state, action } = useEventEditPage();
  return (
    <SidebarLayout>
      <EventEdit.Form
        onSubmitHandler={action.onSubmitHandler}
        goPrevRoute={action.goPrevRoute}
      >
        <EventEdit.Editor
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
      </EventEdit.Form>
    </SidebarLayout>
  );
}
