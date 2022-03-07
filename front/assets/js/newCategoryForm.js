const newCategoryForm = {

    //*Je stocke le formulaire d'ajout pour eviter de refaire des document.querySelector à plusieurs endroits pour recuperer le formulaire
    form : document.querySelector('.category--add form'),

    baseUri : "http://0.0.0.0:3000/api/v1/",

    success: null,

    init: function(){
        
        newCategoryForm.form.addEventListener('submit', newCategoryForm.handleNewCategoryFormSubmit);
    },

    handleNewCategoryFormSubmit : function(evt) {
        evt.preventDefault();
        
        //*Je recupere l'input de mon formulaire
        let inputCategoryForm = document.querySelector('input[name="name"]');
        //*Je recupere la valeur de l'input
        let categoryName = inputCategoryForm.value;
        console.log(categoryName)

        if(newCategoryForm.success) {
         //*Je vide l'input
         inputCategoryForm.value ="";
        }

        //*Je mets le focus sur le champ input
        inputCategoryForm.focus();

        //*** Je fais appel à handleTemplate pour ajouter la categorie(message de success si la tache a bien été ajoutée, message d'erreur dans le cas contraire)*/
        newCategoryForm.handleTemplate(categoryName);

    },

    handleTemplate : function(categoryName){

            if(categoryName != '') {

                //*Je stocke le nom de la categorie dans un objet data pour l'envoyer en format JSON
                const data = {
                    "name" : categoryName,
                };

                const httpHeaders = new Headers();
                httpHeaders.append("Content-Type", "application/json");

                let fetchOptions = {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: httpHeaders,
                    body: JSON.stringify(data)
                };


                fetch(newCategoryForm.baseUri + "categories" , fetchOptions)
            
                .then(
                    function(response) {
                        //*Si le status de la requete est 201 ça veut dire que notre catégorie a bien été ajoutée coté bdd
                        if (response.status == 201) {
                            newCategoryForm.success = true
                            //categoriesList.init();
                            alert.alertSuccess('Categorie ajoutée');
                        }
                        
                    }
                )
                .catch(function(error) {
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                  });
   
            } else {
                alert.alertEmptyField();  
            }
    },
}