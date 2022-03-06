const newTaskForm = {

    //*Je stocke le formulaire d'ajout pour eviter de refaire des document.querySelector à plusieurs endroits pour recuperer le formulaire
    form : document.querySelector('.task--add form'),

    baseUri : "http://0.0.0.0:3000/",

    init: function(){
        //console.log("new task form Init !");
        
        newTaskForm.form.addEventListener('submit', newTaskForm.handleNewTaskFormSubmit);
    },

    handleNewTaskFormSubmit : function(evt) {
        evt.preventDefault();
        //let formElement = evt.currentTarget;
        
        //*Je recupere l'input de mon formulaire
        let inputTaskForm = document.querySelector('input[name="title"]');
        //*Je recupere la valeur de l'input
        let taskTitle = inputTaskForm.value;

        //*Je recupere le select de mon formulaire
        const selectCategoryForm = document.querySelector('.task--add .select select');

        const categoryId = selectCategoryForm.selectedIndex;
       
        //*Je recupere la valeur du select
        const categorySelect = selectCategoryForm.value;

        //*Je vide l'input
        inputTaskForm.value ="";
        selectCategoryForm.value = "Choisir une catégorie";

        //*Je mets le focus sur le champ input
        inputTaskForm.focus();

        //*** Je fais appel à handleTemplate pour ajouter la categorie(message de success si la tache a bien été ajoutée, message d'erreur dans le cas contraire)*/
        newTaskForm.handleTemplate(taskTitle, categorySelect, categoryId);

    },

    handleTemplate : function(taskTitle, categoryName, categoryId){
        if ("content" in document.createElement("template")) { 
            let success = null;
            let failed = null

            //*Je recupère le template
            var template = document.querySelector("#task__template").content.cloneNode(true);

            /**
             ** Je récupère le dernier enfant du formulaire
             ** et le nom du dernier enfant pour mieux gerer l'affichage du msg d'erreur ou de succès
             */ 
            let formLastChild = newTaskForm.form.lastChild;
            let formLastChildName = formLastChild.nodeName;


            //*Je verifie si le titre de la taste et le nom de la categorie ne sont pas vide
            if(taskTitle != '' && categoryName != 0) {

                //*Je stocke les 2 variable dans un objet data pour l'envoyer en format JSON
                const data = {
                    "title" : taskTitle,
                    "categoryId" : categoryId,
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


                fetch(newTaskForm.baseUri + "tasks" , fetchOptions)
            
                .then(
                    function(response) {
                        //*Si le status de la requete est 201 ça veut dire que notre tache a bien été ajoutée coté bdd
                        //* On l'ajoute coté front
                        if (response.status == 201) {
                            //*J'ajoute le titre et le nom de la categorie
                            template.querySelector('.task__title-label').textContent = taskTitle;
                            template.querySelector('.task__title-field').innerText = taskTitle;

                            template.querySelector('.task__category').textContent = categoryName;

                            const divTask = template.querySelector('.task');
                            divTask.dataset.category = categoryName;


                            //*Je recupere le parent des taches
                            let parentTaskElement = document.querySelector('.task').parentElement;

                            //*J'ajoute le template rempli comme enfant de tasks
                            parentTaskElement.appendChild(template);

                            alert.alertSuccess('ajoutée');

                            task.init(divTask);
                            alert.timeoutSet();
                            alert.timeoutClear(alert.timeoutSet());

                        }
                        
                    }
                )
   
            } else {
                alert.alertEmptyField();

            }


        }
    },
}