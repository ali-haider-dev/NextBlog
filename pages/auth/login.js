import Form from "@/components/auth/form";

import { Signin, auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
export default function SignIn() {
    const handleSumbit = (email, password) => {
        Signin(email, password).then(() => {
            console.log(email, password);

            window.location = "/blog/addBlog";

        });
       
    }
    return <Form signIn={true}
        onFormSubmit={handleSumbit}
    />
};

