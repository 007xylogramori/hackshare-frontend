import axios from 'axios';


export const getResourcesByType = async (teamId:string, filetype:string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}resources/${teamId}/${filetype}`, {
      withCredentials: true,
    });
    console.log(response.data.data)
    return response.data.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Error fetching resources');
  }
};

export const deleteResource = async (resourceId:string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}resources/${resourceId}`, { withCredentials: true });
    return response.data;
  };
