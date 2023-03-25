import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Text,
    Input,
    Button,
    Loader,
} from '@fluentui/react-northstar';
import {
    UserFriendsIcon,
    PersonIcon,
    LockIcon,
} from '@fluentui/react-icons-northstar';
import { loginDoctor } from '../Requests/LoginDoctor';
import './Login.css';


export const Login: FunctionComponent = () => {
  // State Management
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hooks
  const navigate = useNavigate();

  // Event Handlers
  const usernameOnChangeHandler = (
        event: React.SyntheticEvent<HTMLElement, Event>
    ) => {
        const e = event as React.ChangeEvent<HTMLInputElement>;
        setUsername(e.target.value);
    };

  const passwordOnChangeHandler = (
      event: React.SyntheticEvent<HTMLElement, Event>
  ) => {
      const e = event as React.ChangeEvent<HTMLInputElement>;
      setPassword(e.target.value);
  };

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const data = await loginDoctor(username, password);
      setIsLoading(false);
    } catch (error) {
        console.log('Error. Login.tsx. Error while handling login.', error);
        setLoginError(true);
        setIsLoading(false);
    }
  }



  // Component Rendering
    return (
      <div className='login-container'>
          <Card size='largest' styles={{ width: '100%' , backgroundColor: 'lightblue'}}>
                <Flex column gap='gap.large'>
                    <CardHeader>
                        <Flex
                            space='evenly'
                            styles={({ theme: { siteVariables } }) => ({
                                color: siteVariables.colorScheme.brand
                                    .foreground,
                            })}>
                            <UserFriendsIcon size='largest' color='brand' />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex column gap='gap.medium'>
                            <Input
                                iconPosition='start'
                                icon={<PersonIcon />}
                                placeholder={'Username'}
                                value={username}
                                error={loginError}
                                onClick={() =>
                                    setLoginError(undefined)
                                }
                                onChange={usernameOnChangeHandler}
                                fluid
                            />

                            <Input
                                iconPosition='start'
                                icon={<LockIcon />}
                                placeholder={'Password'}
                                value={password}
                                error={loginError}
                                onClick={() =>
                                    setLoginError(undefined)
                                }
                                onChange={passwordOnChangeHandler}
                                fluid
                            />
                            {isLoading === true && (
                                <Loader size='medium' color='brand' />
                            )}
                            {loginError && (
                                <Text
                                    error
                                    content='Incorrect credentials or un-registered user.'
                                />
                            )}
                        </Flex>
                    </CardBody>
                    <CardFooter>
                        <Flex gap='gap.medium'>
                            <Button
                                content='Login'
                                primary
                                onClick={loginHandler}
                            />
                            <Button
                                content='Register'
                                secondary
                                onClick={() => navigate('/register')}
                            />
                        </Flex>
                    </CardFooter>
                </Flex>
            </Card>
      </div>
    );
}