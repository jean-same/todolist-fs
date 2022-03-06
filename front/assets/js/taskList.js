const taskList = {
    init: function(){

        // je cherche toutes les task pour créer un "objet" par task
        const allTaskElement = document.querySelectorAll('.tasks .task');
        for (const taskElement of allTaskElement) {
            // init correspond à la création de l'objet
            // je lui donne l'élement HTML pour qu'il fasse des recherches ciblées
            task.init(taskElement);
        }
    },
}