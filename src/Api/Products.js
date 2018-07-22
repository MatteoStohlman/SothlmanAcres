import {baseURL} from './CONST'
export function updateProducts(categoryId){
  var requestUrl = baseURL+'https://api.webflow.com/collections/5b528af0ef1d580198490c11/items'

  return fetch(requestUrl,{
                            method: 'GET',
                          })
          .then(response => {
            if (!response.ok) {
              const error = new Error(response.statusText);
              error.response = response;
              throw error;
            }
            return response.json();
          });
}
