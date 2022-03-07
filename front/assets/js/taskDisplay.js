const taskDisplay = {

    baseUri : "http://0.0.0.0:3000/api/v1/",

    fetchOptions: {

        method: 'GET',

        mode: 'cors',
        // Veut-on que la réponse puisse être mise en cache par le navigateur ?
        // Non durant le développement, oui en production.
        cache: 'no-cache'
    },


    init : function(){

        taskDisplay.loadTaskFromAPI();
        
    },

    loadTaskFromAPI: function(){
        let test = ""

        if(filter.filter_archive) {
            test = filter.filter_archive
        }

        fetch(taskDisplay.baseUri + "tasks" + test , taskDisplay.fetchOptions )

        .then(function(response){
            return response.json() ;
        } )

        .then(function(responseJson){
            
            let divTasks = document.querySelector('.tasks');

            divTasks.innerHTML = ""
            if (responseJson.result) {
                
                for(tasks of responseJson.result){

                    let template = document.querySelector("#task__template").content.cloneNode(true);

                    const taskTitleLabel = template.querySelector('.task__title-label');
                    const taskTitleInput = template.querySelector('.task__title-field');
                    const taskCategoryP = template.querySelector('.task__category');
                    const progressBar = template.querySelector('.progress-bar__level');
                    const divTask = template.querySelector('.task');

                    taskTitleLabel.textContent = tasks.title;
                    taskTitleInput.value = tasks.title;
                    taskCategoryP.textContent = tasks.category_name;
                    progressBar.style.width = tasks.completion +"%";
                    divTask.dataset.category = tasks.category_name;
                    divTask.dataset.id = tasks.id

                    if(tasks.status == 2){
                        divTask.classList.remove('task--todo');
                        divTask.classList.remove('task--edit');
                        divTask.classList.add('task--archive');
                        //divTask.style.display = 'none'
                    }
                    
                    if(tasks.completion == 100){
                        divTask.classList.remove('task--todo');
                        divTask.classList.remove('task--edit');
                        divTask.classList.add('task--complete');
                    }

                    divTasks.appendChild(template);
                // taskDisplay.hideArchivedTask();
                    
                    task.init(divTask);
                }
            } else {
                  divTasks.innerHTML = "<h1 class='has-text-centered'>Pas de tache à afficher</h1>"  
            }

        }) 
    },

    hideArchivedTask : function () {
    
        let taskDivs = document.querySelectorAll('.task');
    
        for (const task of taskDivs){
            
            let listOfClasses = task.classList;

            for(classes of listOfClasses){
                    if (classes == "task--archive"){
                        task.style.display = "none"
                    }
            }           
        }
    }
}
