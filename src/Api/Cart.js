import {baseURL_pure} from './CONST'
export function placeOrder(orderInfo){
  var requestUrl = baseURL_pure

  return fetch(requestUrl,{
                            method: 'POST',
                            body:JSON.stringify(orderInfo)
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
