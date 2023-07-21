import axios from 'axios';
import { User } from 'next-auth';

type FetchMeParams = {
  signal?: AbortSignal;
};

export async function fetchMe(params?: FetchMeParams) {
  return axios
    .get<User>(`${process.env.NEXT_PUBLIC_URL}/api/users/me`, params)
    .then((response) => response.data);
}
