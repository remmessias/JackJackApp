import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';

import MyStorage from '../libs/Storage';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            authFailed: false
        }
    }

    async login() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        const successLogin = await new MyStorage().checkLogin(data);

        if (successLogin) {
            this.setState({ authFailed: false});
            this.props.navigation.navigate('App');
        } else {
            this.setState({ authFailed: true});
        }
    }

    renderFailedText() {
        return this.state.authFailed ? (
            <Text style={styles.failedText}>
                Authentication failed. Try again.
            </Text>
        ) : null;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={require('../assets/img/jackjack.jpeg')} resizeMode='contain' />
                    <Text style={styles.logoText}>Jack Jack App</Text>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        keyboardAppearance='light'
                        placeholder='Username'
                        autoFocus={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        keyboardAppearance='light'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        secureTextEntry={true}
                    />
                    <Button
                        onPress={() => this.login()}
                        title="Login"
                        color="#841584"
                        accessibilityLabel="Login"
                    />
                    {this.renderFailedText()}
                </View>
                <View style={styles.newUser}>
                    <Text style={styles.createUser} onPress={() => this.props.navigation.navigate('NewUser')}>Click here to create a new user!</Text>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    logo: {
        height: 100
    },
    logoText: {
        fontSize: 30,
        fontFamily: 'sans-serif-thin'
    },
    input: {
        marginBottom: 10,
        height: 40
    },
    body: {
        marginLeft: 30,
        marginRight: 30
    },
    newUser: {
        alignItems: 'center',
        marginBottom: 100
    },
    createUser: {
        marginTop: 10
    },
    failedText: {
        marginTop: 10,
        color: 'red'
    }
});