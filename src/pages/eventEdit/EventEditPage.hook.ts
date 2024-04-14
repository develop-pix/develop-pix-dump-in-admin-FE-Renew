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
  const navigate = useNavigate();
  const [photoboothName, setPhotoboothName] = useState('');
  const [hashtag, setHashtag] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(['']);
  const [isPublic, setIsPublic] = useState(false);
  const [title, setTitle] = useState('');
  const [, setEventManage] = useRecoilState(eventManageState);
  const eventId = Number(params);
  const [description, setDescription] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const { data: eventData } = useQuery({
    queryKey: [`/api/event/id`, params],
    queryFn: () => getSingleEventQuery(params ?? ''),
    enabled: !!params,
  });

  const initStartDate = eventData?.data?.startDate ?? new Date();
  const initEndDate = eventData?.data?.endDate ?? new Date();

  const mutation = useMutation({
    mutationFn: updateSingleEventMutation,
    onSuccess: () => {
      // 업데이트를 한 후 다시 Get api call을 한다.
      queryClient.invalidateQueries({ queryKey: [`/api/event/id`, params] });

      // eventManage 전역 상태를 초기화하여 다시 API call이 일어날 수 있도록 한다.
      setEventManage(() => []);

      navigate(-1);
    },
  });

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

    /** base64 이미지들을 Blob 형식으로 변환 */
    const blobImages = [...images].map((data) => base64ToBlob(data));

    /** Blob화 된 이미지들을 모두 S3에 업로드 한 후 해당 URL값들을 Array형식으로 변환 */
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

  // 처음 Get Api Call이 있을시 이때 가져온 값을 초기 상태로 변환한다.
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
