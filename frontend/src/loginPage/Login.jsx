import React, {useState} from 'react';
import * as Form from '@radix-ui/react-form';
// import { Theme } from '@radix-ui/themes';
import { Box, Container } from '@radix-ui/themes';
import './login.css'

export default function Login(){

    const [serverErrors, setServerErrors] = useState({
        email: false,
        password: false,
    });

    return(
        <>
        <div className='login-box'>
            <h1>Login Here</h1>
           
        <Form.Root className="Login-FormRoot">
            <Form.Field className='LoginField' name="email">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
                     Please enter your email
                </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
                </div>
                <Form.Control asChild>
        <input className="login-input" type="email" required />
      </Form.Control>

            </Form.Field>


            <Form.Field className='LoginField' name="password">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
                     Please enter a password
                </Form.Message>
                </div>
                <Form.Control asChild>
                <input className="login-input" type="password" required />
                </Form.Control>

            </Form.Field>

            <Form.Submit asChild>
                <button className='login-submit-button'>
                    Submit
                </button>
            </Form.Submit>

        </Form.Root>

        </div>
        </>
    )
        
    }

