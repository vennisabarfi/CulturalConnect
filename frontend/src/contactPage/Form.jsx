
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
         
        
        //  update this later. add redirection to home page or a thank you page after form is sent
         console.log(response.data)

           
 
            
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

    {/* Business/Resource Name */}
        <div className="field">
        <label className="mb-2" htmlFor="name">Business/Organization Name</label>
        {errors.name && <span className="form-error">This field is required</span>}
        <input onChange={(e) => setForm({...form, name: e.target.value})} className="input" type="text" id="name" placeholder="Eg. Cincinnati Organization" {...register("name",
                                                                                            {required: "This Field is required" },)}/>
        
        </div>

        {/* Location */}
        <div className="field">
        <label className="mb-2" htmlFor="location">Location/Address</label>
        {errors.location && <span className="form-error">This field is required</span>}
        <input onChange={(e) => setForm({...form, name: e.target.value})} className="input" type="text" id="location" placeholder="Eg. 123 Cincinnati, Ohio" {...register("location",
                                                                                            {required: "This Field is required" },)}/>
        
        </div>

        {/* Website */}
        <div className="field">
        <label className="mb-2" htmlFor="website">Website/Social Media</label>
        {errors.website && <span className="form-error">This field is required</span>}
        <input onChange={(e) => setForm({...form, name: e.target.value})} className="input" type="text" id="website" placeholder="Eg. www.cincygaypages.com" {...register("website",
                                                                                            {required: "This Field is required" },)}/>
        </div>

        {/* Phone Number */}
        <div className="field">
        <label className="mb-2" htmlFor="phone">Phone Number</label>
        {/* commented this out for now till I figure out a better way to validate */}
        {/* {errors.phone && <span className="form-error">This field is required</span>} */}
        <input onChange={(e) => setForm({...form, name: e.target.value})} className="input" type="text" id="phone" placeholder="Eg. +1 513..." {...register("phone",
                                                                                            { pattern: /\d+/ },)}/>
        </div>

        

       

            {/* Business Email */}
        <div className="field">
        <label className="mb-2" htmlFor="email">Business/Organization Email Address</label>
        {/* {errors.email && <span className="form-error">{errors.email.message}</span>} */}
        <input
  className="input"
  type="email"
  id="email"
  onChange={(e) => setForm({...form, name: e.target.value})}
  placeholder="example@gmail.com"
  {...register("email", {
    // required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  })}
/>      
        </div>
        

        </div>

        <div className="feedback-box">
      <label htmlFor="feedback-area">Optional Message/ Extra Information</label>
      {/* {errors.feedback && <span className="form-error"></span>} */}
      <textarea onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Hi Vennisa, I want to build a website for my business and would love to connect . . ." id="feedback-area" {...register("feedback",)}/>
      {/* <Toaster className="toaster" position="top-center"/> */}
      <button className="form-button" type="submit" >
        Submit Form</button>
      <p className="text-sm text-muted-foreground">
        Thanks for connecting!
      </p>
     </div>
       
        </div>
        
        </form>
        
       
        </> 
    );

}