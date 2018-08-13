import { AsyncStorage} from 'react-native';

export default class MyStorage {
    load = async () => {
        const acessToken = await AsyncStorage.getItem('accessToken');
        const key = 'storageTasks' + acessToken;
        const currentData = JSON.parse(await AsyncStorage.getItem(key));
        return (currentData === (undefined || null) ? [] : currentData);
    }

    add = async (data) => {
        const currentData = await this.load();

        const newData = {
            id: (currentData.length > 0 ? (currentData[currentData.length-1].id + 1) : 1),
            title: data.title,
            description: data.description,
            rating: data.rating
        } 

        currentData.push(newData);

        const acessToken = await AsyncStorage.getItem('accessToken');
        const key = 'storageTasks' + acessToken;

        await AsyncStorage.setItem(key, JSON.stringify(currentData));

        return newData;
    }

    destroy = async (id) => {
        const currentData = await this.load();

        currentData.forEach((element, index, array) => {
            if (element.id === id) {
                array.splice(index, 1);
            }
        });

        const acessToken = await AsyncStorage.getItem('accessToken');
        const key = 'storageTasks' + acessToken;

        await AsyncStorage.setItem(key, JSON.stringify(currentData));

        return currentData;
    }

    update = async (id, task) => {
        const currentData = await this.load();
        
        let objIndex = currentData.findIndex((obj => obj.id == id));

        currentData[objIndex].title = task.title;
        currentData[objIndex].description = task.description;
        currentData[objIndex].rating = task.rating;

        const acessToken = await AsyncStorage.getItem('accessToken');
        const key = 'storageTasks' + acessToken;

        await AsyncStorage.setItem(key, JSON.stringify(currentData));

        return currentData;
    }

    loadUsers = async () => {
        const currentData = JSON.parse(await AsyncStorage.getItem('users'));
        return (currentData === (undefined || null) ? [] : currentData);
    }

    addUser = async (data) => {
        console.log("Aqui")
        const currentData = await this.loadUsers();

        const newData = {
            id: (currentData.length > 0 ? (currentData[currentData.length-1].id + 1) : 1),
            username: data.username,
            email: data.email,
            password: data.password
        } 

        currentData.push(newData);

        await AsyncStorage.setItem('users', JSON.stringify(currentData));
    }

    checkLogin = async (data) => {
        const currentData = await this.loadUsers();

        const user = currentData.find(user => {
            return user.username === data.username && user.password === data.password;
        });

        if (typeof user !== 'undefined' && typeof user !== null) {
            await AsyncStorage.setItem('accessToken', data.username+'@'+data.password);
            return true;
        }
        return false;
    }

    deleteAccess = async () => {
        await AsyncStorage.removeItem('accessToken');
    }
}