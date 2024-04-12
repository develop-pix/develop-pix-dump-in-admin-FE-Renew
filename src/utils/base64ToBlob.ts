/**
 * Base64 인코딩 된 문자열을 Blob object로 변환
 *
 * @param base64 - 변환할 Base64로 인코딩 된 문자열
 * @param mimeType - Blob의 MIME 타입, 디폴트 값은 'image/png'.
 * @returns 디코딩 된 Base64 데이터를 대표하는 Blob object
 * @throws 주어진 문자열이 Base64 형식이 아닐때 에러
 */
// eslint-disable-next-line import/prefer-default-export
export function base64ToBlob(base64: string, mimeType = 'image/png'): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}
