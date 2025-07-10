import { useState } from 'react';

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const FETCH_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

interface UseMutationArg<ResponseData> {
  onSuccess?: (data?: { response: ResponseData; headers: Headers }) => void;
  onFailure?: (error?: string) => void;
  onSettled?: () => void;
}

const useMutation = <BodyData, ResponseData>({ onSuccess, onFailure, onSettled }: UseMutationArg<ResponseData>) => {
  const mutateQuery = async (fetchInformation: {
    url: string;
    method: MutationFetchMethod;
    bodyData?: BodyData;
    headers?: HeadersInit;
  }) => {
    const { url, method, bodyData, headers } = fetchInformation;

    const body = bodyData ? JSON.stringify(bodyData) : null;

    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: ResponseData = await response.json();
      onSuccess?.({ response: data, headers: response.headers });
    } catch (e) {
      if (e instanceof Error) {
        onFailure?.(e.message);
      }
    } finally {
      onSettled?.();
    }
  };

  return mutateQuery;
};
export default useMutation;
