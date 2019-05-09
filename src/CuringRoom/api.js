var baseURL = 'http://192.168.1.11'
export function setOutlet(roomNumber,unit,state){
  var requestUrl = baseURL+"/setOutlet?roomNumber="+roomNumber+"&unit="+unit+"&state="+(state?1:0)

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
