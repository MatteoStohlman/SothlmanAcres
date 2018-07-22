import {baseURL} from './CONST'
export function getCategories(userId,month,year){
  var requestUrl = baseURL+'https://api.webflow.com/collections/5b52827a45c6a39fde49d95c/items'

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
