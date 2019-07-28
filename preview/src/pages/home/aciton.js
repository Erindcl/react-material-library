import {homeType} from './constant';

const homeData = (data) => ({
  type: homeType.GET_HOME_DATA,
  payload: data
})
export const getHomeData = (params) => async (dispatch, getState,{ API }) => {
  try {
    API.getHomeData(params).then(response =>{ 
      if (response.success) {
        dispatch(homeData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}
