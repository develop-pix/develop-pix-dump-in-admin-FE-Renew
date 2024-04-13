/* eslint-disable import/no-cycle */
import { useMutation, useQuery } from '@tanstack/react-query';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { stateFromHTML } from 'draft-js-import-html';
import { useRecoilState } from 'recoil';
import { getSingleEventQuery, updateSingleEventMutation } from '../../remote';
import { base64ToBlob } from '../../utils';
import { uploadFile } from '../../hooks';
import { queryClient } from '../../App';
import { eventManageState } from '../../recoil';

const useEventEditPage = () => {
  const params = useLocation().pathname.split('/').pop();
  const [photoboothName, setPhotoboothName] = useState('');
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(['']);
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const eventId = Number(params);
  const { data: eventData } = useQuery({
    queryKey: [`/api/event/id`, params],
    queryFn: () => getSingleEventQuery(params ?? ''),
    enabled: !!params,
  });
  const [, setEventManage] = useRecoilState(eventManageState);

  const mutation = useMutation({
    mutationFn: updateSingleEventMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/event/id`, params] });
      setEventManage(() => []);
      navigate(-1);
    },
  });

  useEffect(() => {
    if (eventData) {
      setTitle(eventData?.data.title ?? '');
      setPhotoboothName(eventData?.data.brandName ?? '');
      setImages(
        [
          eventData?.data.mainThumbnailUrl ?? '',
          ...(eventData?.data.images ?? []),
        ] ?? []
      );
      setIsPublic(eventData?.data.isPublic ?? false);
      setHashtag(eventData?.data.hashtags ?? []);
      setDescription(
        EditorState.createWithContent(
          stateFromHTML(eventData?.data.content ?? '')
        )
      );
    }
  }, [eventData]);
  const initStartDate = eventData?.data?.startDate ?? new Date();
  const initEndDate = eventData?.data?.endDate ?? new Date();

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const goPrevRoute = () => {
    navigate(-1);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      photoboothName: { value: string };
      startDate: { value: string };
      endDate: { value: string };
      isPublic: { checked: boolean };
    };

    const blobImages = [...images].map((data) => base64ToBlob(data));
    const urlImages = await Promise.all(blobImages.map(uploadFile));

    const body = {
      title: target.title.value,
      brandName: target.photoboothName.value,
      startDate: target.startDate.value,
      endDate: target.endDate.value,
      hashtags: hashtag,
      content: stateToHTML(description.getCurrentContent()),
      mainThumbnailUrl: urlImages[0],
      images: urlImages,
      isPublic: target.isPublic.checked,
    };

    mutation.mutate({ body, id: eventId });
  };

  return {
    state: {
      title,
      photoboothName,
      images,
      description,
      hashtag,
      startDate: initStartDate,
      endDate: initEndDate,
      isPublic,
    },
    action: {
      setPhotoboothName,
      setImages,
      setDescription,
      setHashtag,
      onSubmitHandler,
      handlePublicChange,
      goPrevRoute,
      setTitle,
    },
  };
};

export default useEventEditPage;
