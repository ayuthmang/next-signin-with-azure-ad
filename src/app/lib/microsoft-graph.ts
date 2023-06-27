import axios from 'axios'

const MS_GRAPH_BASE_URL = 'https://graph.microsoft.com/v1.0'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: MS_GRAPH_BASE_URL,
})

export async function getMe(token: string) {
  const response = await axiosInstance.get<GetMeResponse>('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export type GetMeResponse = {
  id: string
  displayName: string
  userPrincipalName: string
  businessPhones: string[]
  jobTitle: string
  mail: string
  mobilePhone: string
  officeLocation: string
  preferredLanguage: string
}

export async function getListItemsInMyDrive(token: string) {
  const response = await axiosInstance.get<ListItemsInMyDriveResponse>(
    `/me/drive/root/children`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export type ListItemsInMyDriveResponse = {
  value: {
    id: string
    name: string
    webUrl: string
    createdBy: {
      user: {
        id: string
        displayName: string
        email: string
      }
    }
  }[]
}

export async function getSearchItemInMyDrive(token: string, query: string) {
  const response = await axiosInstance.get<SearchItemInMyDriveResponse>(
    `/me/drive/root/search(q='${query}')?$top=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export type SearchItemInMyDriveResponse = {
  value: {
    id: string
    name: string
    webUrl: string
    createdBy: {
      user: {
        id: string
        displayName: string
        email: string
      }
    }
  }[]
}
