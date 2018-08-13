import React from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    TouchableHighlight,
    InputText,
    StyleSheet,
    Text,
    Button,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Task from '../components/Task';
import MyStorage from '../libs/Storage';
import HeaderTitle from '../components/HeaderTitle';

export default class Main extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <HeaderTitle icon='home-outline' title='Home' />
            ),
            headerLeft: (
                <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={workspaceStyles.headerLeftIcon}>
                    <Icon name={'menu'} size={25} color="#6d6d6d" />
                </TouchableHighlight>
            ),
            headerRight: (<View></View>),
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/img/jackjack.jpeg')}
                    style={[workspaceStyles.icon, { tintColor: tintColor }]}
                />
            ),
        };
    };

    state = {
        tasks: [],
        filterByTitle: ''
    }

    async componentWillMount() {
        const tasks = await new MyStorage().load();
        this.setState({ tasks: tasks });
    }

    onPressRating = (index, value) => {
        const tasks = this.state.tasks;

        tasks[index].value = value;

        this.setState({ tasks: tasks });
    }

    appendToTasks = (task) => {
        const tasks = this.state.tasks;

        tasks.push(task);

        this.setState({ tasks });
    }

    updateTasks = (tasks) => {
        this.setState({ tasks });
    }

    async applyFilters(filter) {
        let tasks = await new MyStorage().load();
        if (filter === '') {
            this.setState({ filterByTitle: filter, tasks: tasks });
        }
        else {
            tasks = tasks.filter(item => { return item.title.match(filter) })
            this.setState({ filterByTitle: filter, tasks: tasks });
        }
    }

    dispatchFetchPage() {

    }

    render() {
        return (
            <View style={workspaceStyles.container}>
                <View style={workspaceStyles.buttons}>
                    <Button onPress={() => this.props.navigation.navigate('NewTask', { appendToTasks: this.appendToTasks })}
                        title="Add Task"
                        color="#841584"
                        accessibilityLabel="Add Task">
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate('Filter', {
                        filterByTitle: this.state.filterByTitle,
                        applyFilters: this.applyFilters.bind(this)
                    })}
                        title="Filter"
                        color="#841584"
                        accessibilityLabel="Filter">
                    </Button>
                </View>
                <ScrollView contentContainerStyle={workspaceStyles.list}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.tasks}
                        renderItem={({ item, index }) => (
                            <View style={workspaceStyles.listItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDetails', {
                                    task: item,
                                    updateTasks: this.updateTasks
                                })}>
                                    <Task
                                        index={index}
                                        task={item}
                                        onPressRating={this.onPressRating} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateTask', {
                                    task: item,
                                    updateTasks: this.updateTasks
                                })}>
                                    <Icon name={'pencil'} size={25} color="#6d6d6d" />
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={item => `${item.id}`}
                        // onEndReached={() => this.dispatchFetchPage()}
                        initialNumToRender={8}
                        // maxToRenderPerBatch={2}
                        // onEndReachedThreshold={0.5}
                        onEndReachedThreshold={0.5}
                        onEndReached={({ distanceFromEnd }) => {
                            console.log('on end reached ', distanceFromEnd)
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}

const workspaceStyles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    headerRightIcon: {
        marginRight: 15
    },
    headerLeftIcon: {
        marginLeft: 15
    },
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 20
    },
    list: {
        paddingTop: 10
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});