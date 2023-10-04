import axios from 'axios';

// axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
    key: "39381164-baeec6123c69d947a42ded8c3",
    image_type: 'photo',
    per_page: 12,
     orientation: 'horizontal',
  
};

export const getArticlesService = async (query, page) => {
  const  data  = await axios.get("https://pixabay.com/api/", {
    params: {
      q: query || 'Ukraine',
      page,
    },
  });
  return data;
};