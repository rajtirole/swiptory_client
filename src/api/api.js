import { BACKEND_URL } from "../constants/apiConstant"
import Cookies from 'js-cookie';
import axios from 'axios'

axios.defaults.withCredentials = true;

export const getCurrentUser=async()=>{
  
  try {
    
    let options = {
        method: "POST",
        headers: { "content-type": "application/json" },
      url:`${BACKEND_URL}/user/getUser`,
        withCookies:true,
        withCredentials:true,
      };
    const res =await axios(options)
    console.log(res);
    return res?.data;
} catch (error) {
  throw error
  
}

}
export const registerUser=async(formValue)=>{
      try {
          let options = {
              method: "POST",
              headers: { "content-type": "application/json" },
            url:`${BACKEND_URL}/user/register`,
              withCookies:true,
              withCredentials:true,
              data:{
                  userName:formValue.username,
                  password:formValue.password
              }
             
              
            };
          const res =await axios(options)
          return res?.data;
      } catch (error) {
        throw error.response
        
      }

}
export const signInUser=async(formValue)=>{
  try {
      let options = {
          method: "POST",
          headers: { "content-type": "application/json" },
        url:`${BACKEND_URL}/user/login`,
          withCookies:true,
          withCredentials:true,
          data:{
              userName:formValue.username,
              password:formValue.password
          }
        };
      const res =await axios(options)
      return res?.data?.success
  } catch (error) {
    throw error.response
    
  }

}
export const logoutUser=async()=>{
  try {
      let options = {
          method: "GET",
          headers: { "content-type": "application/json" },
        url:`${BACKEND_URL}/user/logout`,
          withCookies:true,
          withCredentials:true,
        };
      const res =await axios(options)
      console.log(res);
      console.log(res.cookies);
      return res ? res?.data:null;
  } catch (error) {
    throw error.response
    
  }

}
export const postStories=async(validPosts)=>{
      try {
          let options = {
              method: "POST",
              headers: { "content-type": "application/json" },
            url:`${BACKEND_URL}/stories/postStories`,
              withCookies:true,
              withCredentials:true,
              data:validPosts
            };
          const res =await axios(options)
          return res?.data;
      } catch (error) {
        console.log(error);
        throw error.response
        
      }

}
export const getStories=async()=>{
      try {
          let options = {
              method: "POST",
              headers: { "content-type": "application/json" },
              url:`${BACKEND_URL}/stories/getStories`,
              withCookies:true,
              withCredentials:true,
            };
          const res =await axios(options)
          console.log(res);
          return res?.data;
      } catch (error) {
        console.log(error);
        throw error.response
        
      }

}
export const getNextStories=async(userId = null,postIndex,postIndexLimit,category)=>{
      try {
          let options = {
              method: "POST",
              headers: { "content-type": "application/json" },
              url:`${BACKEND_URL}/stories/getNextStories`,
              withCookies:true,
              withCredentials:true,
              params:{
                postIndex,
                postIndexLimit,
                category
              }
            };
            let queryString = new URLSearchParams(options.params).toString();

// Append the query string to the URL
options.url = `${options.url}?${queryString}`;
console.log(options);

          const res =await axios(options)
          console.log(res);
          return res?.data;
      } catch (error) {
        console.log(error);
        throw error.response
        
      }

}
