const filter = {

    showArchivedTasksButton: false,

    filter_choice: false,

    filterButtons : document.querySelectorAll('.filters__task .button'),


    init: function(){
    

        for (const filterButton of filter.filterButtons) {
    
            filterButton.addEventListener('click', filter.handleFilter)
        }

        const hideAndShowArchive = document.querySelector('.filters__task--archived');

        hideAndShowArchive.addEventListener('click', filter.handleArchive);

        const filterSelectByDate = document.querySelector(".select__filters__date select")

        filterSelectByDate.addEventListener("change" , filter.showByDate)

    },

    handleFilter: function(evt){
        let filterClicked = evt.currentTarget;
        let filterChoice = filterClicked.dataset.filter;

        //* je supprime la classe is-info(qui rend le boutton actif)
        for(const buttons of filter.filterButtons){ 
            buttons.classList.remove('is-info');
        }
        //* J'ajoute la classe is-info sur le boutton qui a été sélectionné par lutilisateur
        filterClicked.classList.add('is-info');

        let taskDivs = document.querySelectorAll('.task');

        for (const task of taskDivs){
            let listOfClasses = task.classList;

            switch(filterChoice){

                case 'all':
                    if (!listOfClasses.contains('task--archive')){  
                        task.removeAttribute('style', 'display : none');
                    }
                    break; 

                case 'completes':
                    //* Je suppprime le display: none avant d'applliquer l'affichage pour les taches complètes
                    if (!listOfClasses.contains('task--archive')){ 
                        task.removeAttribute('style', 'display : none');
                    }

                    if (!listOfClasses.contains('task--complete') && !listOfClasses.contains('task--add')){
                        task.setAttribute('style', 'display : none');
                    }
                    break;

                case 'incompletes':
                    if (!listOfClasses.contains('task--archive')){ 
                        task.removeAttribute('style', 'display : none');
                    }

                    if (listOfClasses.contains('task--complete')){
                        task.setAttribute('style', 'display : none');
                        if(!listOfClasses.contains('task--complete')){
                            task.removeAttribute('style', 'display : none');
                        }
                    }
                    break;

            }
        }
    },

    handleArchive : function(evt){
        const filterByDateDiv = document.querySelector(".filter-by-date-div")

        if(!filter.showArchivedTasksButton) {
            document.querySelector('.filters__task--archived a').innerText = "Voir les tâches actives"
            filter.filter_choice = "?status=2"
            
            filter.showArchivedTasksButton = true 

            filterByDateDiv.setAttribute('style', 'display : none !important');

            taskDisplay.init()
            filter.hideOrShowActiveTasks()
            return
        } 

        if (filter.showArchivedTasksButton) {
            document.querySelector('.filters__task--archived a').innerText = "Voir les archives"
            filter.filter_choice = false

            filter.showArchivedTasksButton = false 

            filterByDateDiv.removeAttribute('style', 'display : none !important');

            taskDisplay.init()
            filter.hideOrShowActiveTasks()
            return
        }
        
    },

    hideOrShowActiveTasks : function() {
        
        let taskDivs = document.querySelectorAll('.task');

        for (const task of taskDivs){

            let listOfClasses = task.classList;
            
            if(!filter.showArchivedTasksButton) {
                task.removeAttribute('style', 'display : none');
                    
                if (!listOfClasses.contains('task--archive') && !listOfClasses.contains('task--add')){
                    task.setAttribute('style', 'display : none'); 
                }

            }
            
            if(filter.showArchivedTasksButton){
                task.removeAttribute('style', 'display : none');

                if (listOfClasses.contains('task--archive')){
                    task.setAttribute('style', 'display : none');
                }
            }
        }
    },
    
    showByDate : function (evt) {
        const filterByDateSelectValue = evt.currentTarget.value;

        if(filterByDateSelectValue == "ASC" || filterByDateSelectValue == "DESC") {
            filter.filter_choice = "?order=" + filterByDateSelectValue
            taskDisplay.init()
        }
    }

    }
