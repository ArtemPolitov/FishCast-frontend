import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface RegisterData {
  name:string,
  email:string,
  password:string,
  regionId?:number,
  cityId?:number
}

export interface LoginData {
  email:string,
  password:string
}

export interface UserData {
  _id:string,
  name:string,
  email:string,
  regionId:number,
  cityId:number,
  favoriteLocations:string[];
}

export const userApi = createApi({
  reducerPath:'userApi',
  baseQuery:fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_API_URL}/users/`
  }),
  endpoints:(builder)=>({
    register: builder.mutation<{ message: string }, RegisterData>({
      query: (registerData) => ({
        url: 'register',
        method: 'POST',
        body: registerData
      })
    }),
    login:builder.mutation<{ token: string }, LoginData>({
      query:(loginData:LoginData) => ({
        url:'login',
        method:'POST',
        body:loginData
      })
    }),
    getUserData:builder.query<UserData,{token:string}>({
      query:({token})=>({
        url: 'me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    addLocationToFavorites: builder.mutation<void, { locationId: string, token: string }>({
      query: ({ locationId, token }) => ({
        url: `favorite/${locationId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeLocationFromFavorites: builder.mutation<void, { locationId: string, token: string }>({
      query: ({ locationId, token }) => ({
        url: `favorite/${locationId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  })
});

export const {useRegisterMutation,useLoginMutation,useGetUserDataQuery,useAddLocationToFavoritesMutation,useRemoveLocationFromFavoritesMutation} = userApi;