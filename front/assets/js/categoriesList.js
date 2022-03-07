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
        })

        .then(function(responseJson){
            return responseJson.result
        })

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



        new jBox('Modal', {
            attach: '#myModal',
            ajax: {
            url: categoriesList.baseUri + "categories",
            reload: 'strict',
            setContent: false,
            success: function (response) {
                
                console.log('jBox AJAX response', response.result);

                let categoriesDisplay = "";

                for(category of data) {
                    categoriesDisplay += `
                                               <tr>
                                                <th scope="row" class="is-align-items-center pt-4"> ${category.name} </th>
                                                <td class="td-button">
                                                    <button href="#"  class="button is-danger supp" ><i class="fas fa-trash"></i></button>
                                                </td>
                                                </tr>
                                           `
                }


                let arr = ` <b>Liste des catégories</b>
                        <table class="table monTableau" id="tableauLivres">
                            <thead class="thead-dark">
                            <tr id="titresColonne">
                                <th scope="col">Nom</th>
                                <th colspan="2">Action</th>
                            </tr>
                            </thead>
                            <tbody id="tableauBody">
                                ${categoriesDisplay}
                            </tbody>
                        </table>`

                this.setContent(arr);
            
                
            },
            error: function () {
                this.setContent('<b style="color: #d33">Error loading categories.</b>');
            }
            }
        });

        
      parentElementDiv.appendChild(select);
    }
}
