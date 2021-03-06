import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';


@inject('Firebase')
class Registration extends Component {
    @observable
    formInput = {
        username: '',
        password: ''
    }

    @action
    handleChange = event => {
        this.formInput[event.target.name] = event.target.value;
    }

    registerBtnHandler = () => {
        this.props.Firebase.registerUser(this.formInput.username, this.formInput.password);
    }

    loginBtnHandler = () => {
        this.props.Firebase.loginUser(this.formInput.username, this.formInput.password);
    }

    guestLoginHandler = () => {
        this.props.Firebase.loginUser('guest@guest.com', 'password');
    }

    @observer
    render() {
        return (
            <div className='login-form'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                    Log-in to your account
                    </Header>
                    <Form size='large' error>
                    <Segment>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' 
                        value={this.formInput.username} onChange={this.handleChange} name='username'/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                        type='password' value={this.formInput.password} onChange={this.handleChange} name='password'/>
                        <Message
                            error
                            content={this.props.Firebase.errorMessage}
                        />
                        <Grid>
                            <Grid.Column width={8}>
                                <Button color='black' fluid size='large' onClick={this.loginBtnHandler}>
                                    Login
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Button color='black' fluid size='large' onClick={this.registerBtnHandler}>
                                    Register
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={16}>
                                <Button color='black' fluid size='large' onClick={this.guestLoginHandler}>
                                    Log in as a guest
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    </Form>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Registration;