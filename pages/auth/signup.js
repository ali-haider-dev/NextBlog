import Form from "@/components/auth/form";
import { StoreUserDetails, singUp } from "@/config/firebase";

export default function SignUp() {
    const handleSumbit = (name,email,password) => {
        console.log(name, email, password);
        singUp(email, password).then((res) => {
            StoreUserDetails(name,email,password,res.user.uid).then((res) => {
                window.location="/auth/login";
            })
           
        });
    }
    
    return <Form signIn={false} onFormSubmit={handleSumbit} />
};