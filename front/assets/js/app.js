const app = {

    apiRootUrl : "http://0.0.0.0:3000/",

    init: function(){
        
        // sur tout les éléments de la liste
        taskDisplay.init();

        taskList.init();

        newTaskForm.init();

        filter.init();

        categoriesList.init();
    },
}

document.addEventListener("DOMContentLoaded", app.init);