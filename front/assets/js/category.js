const category = {

    baseUri : "http://0.0.0.0:3000/api/v1/",
 

    init : function(){

        if(categoriesList.jboxModalOpen) {
            const buttonDelete = document.querySelectorAll('.arr-category-body .supp');

            console.log(buttonDelete)

            for(let currentButton of buttonDelete) {
                currentButton.addEventListener('click', category.handleDeleteCategory);
            }
        }
    },
 
    handleDeleteCategory: function (evt) {

        const deleteButtonElement = evt.currentTarget;

        const id = parseInt(deleteButtonElement.dataset.id);

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
        };


        alert.alertConfirmDelete().then((result) => {
            if (result.isConfirmed) {

            fetch(task.baseUri + "categories/" + id, fetchOptions)
    
            .then(function(response) {
                    if (response.status == 200) {

                        alert.alertSuccess('Categorie suprimée');
                        alert.timeoutSet();
                        alert.timeoutClear(alert.timeoutSet());
                    }
                    else {
                        alert.alertSomethingWentWrong();
                    }
                })
            } else if (result.dismiss === Swal.DismissReason.cancel ) {
                alert.alertCancelled();
            }
        }) 
    }



}