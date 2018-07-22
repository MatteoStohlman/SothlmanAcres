export function updateProducts(categoryId){
  var requestUrl = 'https://cors-anywhere.herokuapp.com/https://api.webflow.com/collections/5b528af0ef1d580198490c11/items'

  return fetch(requestUrl,{
                            method: 'GET',
                            headers:{
                              Authorization:'Bearer d5d6a8c26c0eff911c7a9872a5489bd978303565937173edac0f518bbb9128e0',
                              'accept-version':'1.0.0',
                            }
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
