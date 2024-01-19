import api from "../../api";

export const changePassword = async (body: unknown) => {
  return await fetch(api.editPassword(), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((json) => json)
    .catch((err) => err);

  // try {
  //   const request = await httpClient.post(api.editPassword(), body);
  //   console.log("12312123123: ", request);
  //   return request;
  // } catch (error: any) {
  //   // const myError = error as MyError;
  //   console.log('is this: ', error);
  //   // if (myError.response) {
  //   //   console.log("requesttt: ", myError.response.data);
  //   //   return myError.response.data;
  //   // }
  // }
};
