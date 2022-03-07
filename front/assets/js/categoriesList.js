const categoriesList = {

    baseUri : "http://0.0.0.0:3000/api/v1/",

    fetchOptions: {

        method: 'GET',

        mode: 'cors',
        // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
        cache: 'no-cache'
      },

    init: function(){

    categoriesList.loadCategoriesFromAPI();
    
    },

    loadCategoriesFromAPI : async function() {

      const infos = await fetch(categoriesList.baseUri + "categories", categoriesList.fetchOptions )

        .then(function(response){
            return response.json() ;
        } )

        .then(function(responseJson){
            return responseJson.result
        } )

        categoriesList.categoriesDisplay(infos, 'add');
    },

    categoriesDisplay : function (data, tab) {

        const select = document.createElement('select');
        select.setAttribute("name", "categories")
        const option = document.createElement('option');

        
        let parentElementDiv = null;

        if(tab == 'add'){
            option.innerText = "Choisir une catégorie";
            option.value = 0
            parentElementDiv = document.querySelector('#select__add')  ;
        }

        select.appendChild(option);
        
        for(result of data){
            const option = document.createElement('option');
            option.setAttribute("data-id", result['id'])
            option.innerText = result['name'];
            select.appendChild(option);
        }

        
      parentElementDiv.appendChild(select);
    }
}
