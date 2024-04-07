/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiResponse = {
  data: {
    message: string;
    code: number;
    success: boolean;
    data: string;
  };
};

type ApiError = {
  error: ApiResponse;
};

type ErrorWithMessage = {
  message: string;
};

/**
 * 주이진 error object가 ApiError인지 체크
 *
 * @param error - 체크할 error object
 * @returns error가 ApiError인지 여부를 나타내는 boolean
 */
export function isApiError(error: any): error is ApiError {
  return error && typeof error === 'object' && 'error' in error;
}

/**
 * 주어진 error object가 ErrorWithMessage인지 체크
 *
 * @param error - 체크할 error object
 * @returns error가 ErrorWithMessage인지 여부를 나타내는 boolean
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

/**
 * 잠재적인 에러를 ErrorWithMessage로 변환.
 * 이미 input이 ErrorWithMessage라면 그 상태를 리턴함.
 * 아닐시, ErrorWithMessage를 input에서부터 JSON.stringify를 사용하여 만들거나,
 * 실패시 String conversion을 사용
 *
 *
 * @param maybeError - 변환시킬 잠재적인 에러
 * @returns ErrorWithMessage object
 */
export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}
