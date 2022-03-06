const filter = {

    showArchivedTasks: false,

    filterButtons : document.querySelectorAll('.filters__task .button'),


    init: function(){
    

        for (const filterButton of filter.filterButtons) {
    
            filterButton.addEventListener('click', filter.handleFilter)
        }

        const hideAndShowArchive = document.querySelector('.filters__task--archived');

        hideAndShowArchive.addEventListener('click', filter.handleArchive);

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

        //filter.showArchivedTasks = true;

        const selectFilter = document.querySelector('#select__filters select');

        const selectValue = selectFilter.value;

        //console.log(selectValue)

        if(!filter.showArchivedTasks) {
            document.querySelector('.filters__task--archived a').innerText = "Voir les tâches actives"
            filter.hideOrShowActiveTasks(filter.showArchivedTasks, selectValue);
            filter.showArchivedTasks = true
            return
        } 
        if (filter.showArchivedTasks) {
            document.querySelector('.filters__task--archived a').innerText = "Voir les archives"
            filter.hideOrShowActiveTasks(filter.showArchivedTasks);
            filter.showArchivedTasks = false
            return
        }
    },

    hideOrShowActiveTasks : function(whatToShow, category = "") {
        
        let taskDivs = document.querySelectorAll('.task');

        for (const task of taskDivs){

            let taskCategory = task.dataset.category

            let listOfClasses = task.classList;
            
            if(!whatToShow) {
                task.removeAttribute('style', 'display : none');
    
                if (!listOfClasses.contains('task--archive') && !listOfClasses.contains('task--add')){
                    task.setAttribute('style', 'display : none'); 
                }
            }
            
            if(whatToShow){
                task.removeAttribute('style', 'display : none');
                if (listOfClasses.contains('task--archive')){
                    task.setAttribute('style', 'display : none');
                }
            }
        }
    }
    

    }
