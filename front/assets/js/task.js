const task = {

    baseUri : "http://0.0.0.0:3000/api/v1/",
 

    init : function(taskElement){
        /* *****************************
            Gestion event label titre 
        ********************************/
        // je me positionne sur mon élément Task pour faire des recherches
        // uniquement dans les enfants de l'élément
        const titleLabel = taskElement.querySelector(".task__title-label");

        // je veux écouter l'évènement click sur le titre (<P>)
        // afin de changer la classe CSS du parent en task--edit
        // comme ça le titre disparait, et l'input apparait
        titleLabel.addEventListener('click', task.handlerClickTitle);

        /* *****************************
            Gestion event Input titre
        *******************************/
        const titleInput = taskElement.querySelector('.task__title-field');
        
        // je met un evenement sur un title
        titleInput.addEventListener('keydown', task.handlerKeydownTitleInput);
        // je veux que l'on réagisse aussi sur la perte du focus
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
        titleInput.addEventListener('blur', task.handlerInputBlur);

        /* *****************************
            Gestion event Boutons
        *******************************/
        const buttonValidate = taskElement.querySelector('.task__button--validate');
        buttonValidate.addEventListener('click', task.handleCompleteTask);

        const buttonIncomplete = taskElement.querySelector('.task__button--incomplete');
        buttonIncomplete.addEventListener('click', task.handleIncompleteTask);


        const buttonArchive = taskElement.querySelector('.task__button--archive');
        buttonArchive.addEventListener('click', task.handleArchiveTask);
        
        const buttonDesarchive = taskElement.querySelector('.task__button--desarchive');

        buttonDesarchive.addEventListener('click', task.handleDesarchiveTask);

        const buttonDelete = taskElement.querySelector('.task__button--delete');

        buttonDelete.addEventListener('click', task.handleDeleteTask);
    },
    /*********************************************************/
    /*
    /*  Méthodes handler
    /*
    /*********************************************************/
    /**
     * Gestion du click title, pour passer en mode edition/modification
     * @param {Event} event info event
     */
    handlerClickTitle : function(event){  

        // je récupère l'élément sur lequel le click a été fait
        const titleElement = event.currentTarget;
    
        const parentElement = titleElement.closest('.tasks .task');
        // genre body > section > ul > li : le closest de li ça sera bien ul

        // on ajoute la classe pour passer en mode modification
        parentElement.classList.add('task--edit');

        const inputElement = parentElement.querySelector('.task__title-field');
        //inputElement.value = inputElement.value;
        
        inputElement.focus();
        inputElement.selectionStart = inputElement.value.length;
    },
    /**
     * Gestion du keydown sur le input title
     * @param {KeyDownEvent} event infos event
     */
    handlerKeydownTitleInput : function(event){
        // je peux intéragir avec le code de la touche appuyée
        // console.log(event.keyCode);
        // je veux réagir sur la touche Enter qui a pour code 13
        // que cela soit celle du pavé numérique ou pas
        if (event.keyCode === 13)
        {
            const titleInputElement = event.currentTarget;
            
            task.validateNewTitle(titleInputElement);
        }
    },
        /**
     * gestion de la perte de focus du input title
     * @param {BlurEvent} event infor sur l'event
     */
    handlerInputBlur : function(event) {
        const titleInputElement = event.currentTarget;
            
        task.validateNewTitle(titleInputElement);
    },
    /*********************************************************/
    /*
    /*  Méthodes D.R.Y.
    /*
    /*********************************************************/
    /**
     * Gestion de la validation du nouveau titre
     * @param {HTLMElement} titleInputElement input title sur lequel on se base
     */
    validateNewTitle : function (titleInputElement){

        const contentTitleElement = titleInputElement.previousElementSibling;
        const parentElement = titleInputElement.closest('.tasks .task');
        const taskTitle = titleInputElement.value;

        const taskTitleId = parentElement.dataset.id;

        const title = {
            title : taskTitle,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(title)
        };


        fetch(task.baseUri + "tasks/" + taskTitleId, fetchOptions)
    
        .then(
            function(response) {
                if (response.status == 200) {
                    contentTitleElement.innerText = taskTitle;
                }
                else {
                    alert('La modification a échoué');
                }
            }
        )

        // on enlève la classe pour re-passer dans le mode "d'origine"
        // on a pas enlever la classe d'origine (ex : task--todo)
        parentElement.classList.remove('task--edit');
    },

    handleCompleteTask : function (evt) {

       // evt.preventDefault();
        //* je récupère l'élément sur lequel l'utilisateur a clické
        const validateButtonElement = evt.currentTarget;

        //* Je recupere la div parent qui porte la classe .task
        const validateButtonElementParent = validateButtonElement.closest('.task');


        const progressBar = validateButtonElementParent.querySelector('.progress-bar__level');

        const id = parseInt(validateButtonElementParent.dataset.id);

        const completion = {
            completion : 100,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(completion)
        };

        alert.alertConfirm("Cette tache sera marquée comme complete!").then((result) => {
            if (result.isConfirmed) {
                fetch(task.baseUri + "tasks/" + id, fetchOptions)

                .then(
                    function(response) {
                        if (response.status == 200) {
                            //*J'enlève la classe task--todo sur la div
                            validateButtonElementParent.classList.remove('task--todo');

                            //*J'ajoute la classe task--complete sur la div
                            validateButtonElementParent.classList.add('task--complete');

                            //*Je mets la barre de progression à 100%
                            progressBar.style.width = 100 + '%';
                            alert.alertSuccess('compléte');
                        }
                        else {
                            alert.alertSomethingWentWrong();
                        }
                    }
                )
            } else if (result.dismiss === Swal.DismissReason.cancel ) {
                alert.alertCancelled();
            }
        })

        
    
    },

    handleIncompleteTask : function (evt) {

        // evt.preventDefault();
         //* je récupère l'élément sur lequel l'utilisateur a clické
        const incompleteButtonElement = evt.currentTarget;

         //* Je recupere la div parent qui porte la classe .task
        const incompleteButtonElementParent = incompleteButtonElement.closest('.task');


        const progressBar = incompleteButtonElementParent.querySelector('.progress-bar__level');

        const id = parseInt(incompleteButtonElementParent.dataset.id);

        const completion = {
            completion : 0.0001,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(completion)
        };

        //*J'utilise l'alert confirm que j'ai crée dans alert.js
        //*Si le resultat envoyé par alert.js est true (isConfirmed de sweetAlert je fetch)
        alert.alertConfirm("Cette tache sera marquée comme incomplete!").then((result) => {
            if (result.isConfirmed) {

                fetch(task.baseUri + "tasks/" + id, fetchOptions)
            
                .then(function(response) {
                    console.log(response)
                        if (response.status == 200) {
                            //*J'enlève la classe task--todo sur la div
                            incompleteButtonElementParent.classList.remove('task--complete');

                            //*Je mets la barre de progression à 100%
                            progressBar.style.width = 0.0001 + '%';
                            alert.alertSuccess('marquee comme incompléte');
                        }
                        else {
                            alert.alertSomethingWentWrong();
                        }
                    })

            } else if (result.dismiss === Swal.DismissReason.cancel ) {
                alert.alertCancelled();
            }
    })
    
    },

    handleArchiveTask : function(evt){

        //* je récupère l'élément sur lequel l'utilisateur a clické
        const archiveButtonElement = evt.currentTarget;

         //* Je recupere la div parent qui porte la classe .task
        const archiveButtonElementParent = archiveButtonElement.closest('.task');

        const id = parseInt(archiveButtonElementParent.dataset.id);

        const status = {
            status : 2,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(status)
        };

        alert.alertConfirm("Vous etes sur le point d'archiver cette tache!").then((result) => {
            if (result.isConfirmed) {

                fetch(task.baseUri + "tasks/" + id, fetchOptions)

                .then(function(response) {
                    if (response.status == 200) {
                        archiveButtonElementParent.classList.remove("task--desarchive");
                        archiveButtonElementParent.classList.add('task--archive');
                        alert.alertSuccess('archivée');
                    return;
                    } else {
                        alert.alertSomethingWentWrong();
                    }
                })
            } else if (result.dismiss === Swal.DismissReason.cancel ) {
                alert.alertCancelled();
            }
        })

    },

    handleDesarchiveTask: function(evt) {

        const desarchiveButtonElement = evt.currentTarget;

        const desarchiveButtonElementParent = desarchiveButtonElement.closest('.task');

        const id = parseInt(desarchiveButtonElementParent.dataset.id);

        const status = {
            status : 1,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: httpHeaders,
            body: JSON.stringify(status)
        };

        alert.alertConfirm("Vous etes sur le point de desarchiver cette tache!").then((result) => {
            if (result.isConfirmed) {

                fetch(task.baseUri + "tasks/" + id, fetchOptions)

                .then(function(response) {
                    if (response.status == 200) {        
                    desarchiveButtonElementParent.classList.remove('task--archive');
                    desarchiveButtonElementParent.classList.add('task--desarchive');
                    return;
                } else {
                    alert.alertSomethingWentWrong();
                }
            })
        } else if (result.dismiss === Swal.DismissReason.cancel ) {
            alert.alertCancelled();
        }
    })

    },
    

    handleDeleteTask: function (evt) {

        const deleteButtonElement = evt.currentTarget;

        const deleteButtonElementParent = deleteButtonElement.closest('.task');
        const id = parseInt(deleteButtonElementParent.dataset.id);

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

            fetch(task.baseUri + "tasks/" + id, fetchOptions)
    
            .then(function(response) {
                    if (response.status == 204) {

                        alert.alertSuccess('suprimée');
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