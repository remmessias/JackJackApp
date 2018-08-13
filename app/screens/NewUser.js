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
            email: '',
            password: '',
            repeatPassword: ''
        }
    }

    async addUser() {
        if (typeof this.state.username !== undefined && typeof this.state.username !== null && this.state.username !== '' &&
            typeof this.state.email !== undefined && typeof this.state.email !== null && this.state.email !== '' &&
            typeof this.state.password !== undefined && typeof this.state.password !== null && this.state.password !== '' &&
            typeof this.state.repeatPassword !== undefined && typeof this.state.repeatPassword !== null && this.state.repeatPassword !== '' &&
            this.state.password === this.state.repeatPassword) {
                const data = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }

                await new MyStorage().addUser(data);

                this.props.navigation.goBack();
        }
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
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        keyboardAppearance='light'
                        placeholder='E-mail'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="email-address"
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
                        secureTextEntry={true}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
                        value={this.state.repeatPassword}
                        keyboardAppearance='light'
                        placeholder='Repeat password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        returnKeyType="next"
                        blurOnSubmit={false}
                    />
                    <Button
                        onPress={() => this.addUser()}
                        title="Create user"
                        color="#841584"
                        accessibilityLabel="Create user"
                    />
                </View>
                <View style={styles.newUser}>
                    <Text style={styles.cancel} onPress={() => this.props.navigation.goBack()}>Cancel</Text>
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
        marginBottom: 40
    },
    cancel: {
        marginTop: 10
    }
});