import client from "./APIinitializer"

const UserDetailsAPI = {

    createUserQuestionnaire: (userData) => {
        return client.post('/api/users/questionnaire', userData);
    }


      
}



export default UserDetailsAPI;