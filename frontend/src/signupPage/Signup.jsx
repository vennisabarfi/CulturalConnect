import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import axios from 'axios';
import './signup.css';

export default function SignUp() {
    const [serverErrors, setServerErrors] = useState();
    const [serverMessage, setServerMessage] = useState();

  

    const onSubmit = async function(event){
        event.preventDefault(); // Prevent the default form submission behavior

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post("http://localhost:3000/user-auth/sign-up", {
                email: data.email,
                password: data.password,
            });

            if (response.status === 200) {

                setServerMessage(response.data.message)
                console.log(response.data)
                window.location.href="/login" //redirect to success page? to login
                
            }
        } catch (error) {
            setServerErrors(error.response.data.message)
            
            console.log(`Error logging in: ${error.response.data.message}`)
        }
    };

    const onClearServerErrors = function(){
        setServerErrors(null)
        setServerMessage(null)
    }

    return (
        <div className='signup-box'>
            <h1>Login Here</h1>
            <Form.Root className="Signup-FormRoot" onSubmit={onSubmit} onClearServerErrors={onClearServerErrors}>
                <Form.Field className='SignupField' name="email" >
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
                        <input name="email" className="login-input" type="email" required />
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
                        <input name="password" className="login-input" type="password" required />
                    </Form.Control>
                </Form.Field>

                <Form.Submit asChild>
                    <button className='login-submit-button'>
                        Submit
                    </button>
                </Form.Submit>
                {serverMessage && <p className="server-message">{serverMessage}</p>}
                {serverErrors && <p className="server-error">{serverErrors}</p>}
            </Form.Root>
           
        </div>

    );
}
