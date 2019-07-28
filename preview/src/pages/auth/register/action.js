import {registerType} from './constant';

const registerData = (data) => ({
  type: registerType.GET_REGISTER_DATA,
  payload: data
})
export const submitRegisterData = (params) => async (dispatch, getState,{API}) => {
  try {
    API.getHomeData(params).then(response =>{ 
      if (response.success) {
        dispatch(registerData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

