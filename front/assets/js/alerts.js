
const alert = {

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