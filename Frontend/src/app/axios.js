// import axios from "axios";
// import queryString from "query-string";

// export const getRequest = (URL, payload) => {
//   let { data: query = {}, config = {}, baseURL } = payload;
//   return axios.get(queryString.stringifyUrl({ url: `${baseURL}/${URL}`, query }), config).then(response => response).catch((error) => ({ error }));
// };

// export const putRequest = (URL, payload) => {
//   let { data = {}, config = {}, baseURL } = payload;
//   return axios.put(`${baseURL}/${URL}`, data, config).then(response => response).catch((error) => ({ error }));
// };

// export const postRequest = (URL, payload) => {
//   let { data = {}, config = {}, baseURL } = payload;
//   return axios.post(`${baseURL}/${URL}`, data, config).then(response => response).catch((error) => ({ error }));
// };

// export const patchRequest = (URL, payload) => {
//   let { data = {}, config = {}, baseURL } = payload;
//   return axios.patch(`${baseURL}/${URL}`, data, config).then(response => response).catch((error) => ({ error }));
// };

// export const deleteRequest = (URL, payload) => {
//   let { data: query = {}, config = {}, baseURL } = payload;
//   return axios.delete(queryString.stringifyUrl({ url: `${baseURL}/${URL}`, query }), config).then(response => response).catch((error) => ({ error }));
// };

// export const getFile = (URL, payload) => {
//   let { data: query = {}, config = {}, baseURL } = payload;
//   const { file: { fileName = "", ext = "" } = {}, ...rest } = query;
//   config.responseType = "blob";
//   return axios.get(queryString.stringifyUrl({ url: `${baseURL}/${URL}`, query: { ...rest } }), config)
//     .then(response => {
//       const type = "application/vnd.ms-excel";
//       const blob = new Blob([response.data], { type: type });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${fileName}.${ext}`;
//       link.click();
//       return ({
//         response: {}
//       });
//     })
//     .catch((error) => ({ error }));

// };
