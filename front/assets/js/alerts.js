
const alert = {

    ajax : function(req) {

        return result = 
        
                $.ajax({
                    url: req,
                    type: "GET",
                    success: function (result) {
                        let categoriesDisplay = "";

                        for(let category of result.result) {
                            categoriesDisplay += `
                                                       <tr>
                                                        <th scope="row" class="is-align-items-center pt-4 "> ${category.name} </th>
                                                        <td class="td-button">
                                                            <button href="#"  class="button is-danger supp" data-id=${category.id}  ><i class="fas fa-trash"></i></button>
                                                        </td>
                                                        </tr>
                                                   `
                        }
                
                
                        let arr = `
                                <table class="table is-fullwidth" id="">
                                    <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Nom</th>
                                        <th colspan="2">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody class="arr-category-body">
                                        ${categoriesDisplay}
                                    </tbody>
                                </table>`;
                        console.log(result)
                        categoriesList.jboxModalOpen = true
                        
                        Swal.fire("Liste des categories", arr);
                        category.init()
                        
                    },
                    error: function () {
                        Swal.fire("Error deleting!", "Please try again", "error");
                    }
                });

    },

    alertSuccess : function(action){
        return result =  Swal.fire({
            position: 'center',
            icon: 'success',
            title: action ,
            showConfirmButton: false,
            timer: 1500
        })
    },
    

    alertConfirm : function(phrase){
        return result = Swal.fire({
            title: 'Êtes vous sûrs?',
            text: phrase,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3e8ed0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui!'
        })
    },

    alertConfirmDelete : function (string = "") {
        return result = Swal.fire({
            title: '<strong>Êtes vous sûrs de vouloir supprimer ' + string + '?</strong>',
            html: '<strong> Cette action est irréversible!!!! </strong>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3e8ed0',
            cancelButtonText: 'No, cancel!',
            cancelButtonColor: '#d33',
            reverseButtons: true
        })
    },

    alertCancelled : function() {
        return result =  Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Cancelled' ,
            showConfirmButton: false,
            timer: 1500
        })
    },

    alertSomethingWentWrong : function () {
        return result = Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    },

    alertEmptyField : function() {
        return result =  new jBox('Notice', {
            attributes: {
                x: 'left',
                y: 'top'
    

            },

            position: {

                x: 250,
                y: 100

            },

            
            stack: false,
            animation: {

            open: 'flip',
            close: 'zoomIn'

            },

            color: "red",
            title: "",
            content: "<h5> <strong>Veuillez remplir les champs obligatoires avant de soumettre le formulaire !!</strong> </h5> ",
            autoClose: 3000,
        });
    },

    timeoutSet : function() {
        return timeoutset = setTimeout(function() { 
            document.location.reload();
        }, 1500); 
    },
    
    timeoutClear : function(func) {
        return clearTimeout(func);
    }
    
}