import React from 'react';

import { createStackNavigator, createSwitchNavigator, DrawerNavigator  } from 'react-navigation';

import Login from '../screens/Login';
import NewUser from '../screens/NewUser';
import Main from '../screens/Main';
import NewTask from '../screens/NewTask';
import TaskDetails from '../screens/TaskDetails';
import UpdateTask from '../screens/UpdateTask';
import Filter from '../screens/Filter';
import LoadingScreen from '../components/LoadingScreen';
import SideMenu from '../components/SideMenu';
import Info from '../components/Info';

const ApplicationStack = createStackNavigator({ 
    Main: Main, 
    NewTask: NewTask, 
    TaskDetails: TaskDetails, 
    UpdateTask: UpdateTask,
    Filter: Filter,
    Info: Info
});

const AppStack = DrawerNavigator(
    {
        Main: ApplicationStack,
    },
    {
        contentComponent: SideMenu,
        drawerWidth: 300
    }
);
const AuthStack = createStackNavigator({ Login: Login, NewUser: NewUser });

export default class MainStackNavigation extends React.Component {

 
    createSwitchNavigator = () => createSwitchNavigator({
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    }, {
            initialRouteName: 'Loading',
        });

    render() {
        const MainStackNavigationConstructor = this.createSwitchNavigator();
        return (
            <MainStackNavigationConstructor />
        );
    }
}