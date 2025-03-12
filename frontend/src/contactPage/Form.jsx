
import { useState} from "react";
import { useForm } from "react-hook-form"
import axios from "axios";
import "./Form.css"
// import { apiKey } from "@/About/Constants";
// import 'dotenv/config'

export default function Form(){

     // handle multiple submissions
     const [isSubmitted, setIsSubmitted] = useState(false);
 
     const [form, setForm] = useState({})

     // initialize react-hook-form
     const {register, handleSubmit, formState: {errors}} = useForm();

    //  api key for form
    const apiKey = import.meta.env.VITE_WEB3_API_KEY;


  
     
     
    
     

     // handle onsubmit
     const onSubmit = async function(data, e){
         e.preventDefault();
         const formData = new FormData(e.target);

         formData.append("access_key", apiKey);
         // prevent multiple submissions

         if (isSubmitted) return;
         try{
           setIsSubmitted(true)
             const response = await axios.post('https://api.web3forms.com/submit', formData,  {headers: {
               'Content-Type': 'application/json',
             },
         });
         
        
        //  update this later
         console.log(response.data)
      
        //  3 second delay and then navigate to home page
        //  setTimeout(function(){
        //     toast('Message has been sent!')
        //     e.target.reset();
        //  }, 500);

        // //  setTimeout(function(){
        // //     
        // //  }, 20000);

        //  setTimeout(function(){
        //     const current_page = window.location.href;
        //     window.location.assign(current_page);
        //  }, 1000);

        //  // when form has submitted
         
        
            
        //      console.log('Form submitted successfully:', response.data);
             
           
        //      console.log("Sent!")
 
           
 
            
         }catch(error){
           // add toast for error
        //    toast.error("Error submitting form")
             console.error('Error submitting form:', error);
             
            
         }
         
 
       
     }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)} >

     
        <div className="feedback-form">
            
        <div className="name-fields">
        <div className="field">
        <label className="mb-2" htmlFor="full-name">Full Name</label>
        {errors.full_name && <span className="form-error">This field is required</span>}
        <input onChange={(e) => setForm({...form, name: e.target.value})} className="input" type="text" id="full-name" placeholder="Eg. Jane Doe" {...register("full_name",
                                                                                            {required: "This Field is required" },)}/>
        
        </div>

        <div className="field">
        <label className="mb-2" htmlFor="email">Email</label>
        {errors.email && <span className="form-error">{errors.email.message}</span>}
        <input
  className="input"
  type="email"
  id="email"
  onChange={(e) => setForm({...form, name: e.target.value})}
  placeholder="example@gmail.com"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  })}
/>
        
        </div>
        

        </div>

        <div className="feedback-box">
      <label htmlFor="feedback-area">Message</label>
      {errors.feedback && <span className="form-error">This field is required</span>}
      <textarea onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Hi Vennisa, I want to build a website for my business and would love to connect . . ." id="feedback-area" {...register("feedback",{required: "Feedback field cannot be empty"})}/>
      {/* <Toaster className="toaster" position="top-center"/> */}
      <button className="form-button" type="submit" >
        Send message</button>
      <p className="text-sm text-muted-foreground">
        Thanks for connecting!
      </p>
     </div>
       
        </div>
        
        </form>
        
       
        </> 
    );

}