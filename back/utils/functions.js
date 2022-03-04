module.exports = {
    
    success(result) {
        return {
            status : 'success',
            result
        }
    },

    successMessage(message) {
        return {
            status : 'success',
            message
        }
    },

    notFound() {
        return {
            status : 'Not found',
            message : "No task found"
        }
    },

    error(message) {
        return {
            status : 'error',
            message
        }
    }

}