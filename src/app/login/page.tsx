import FormControl from "@/components/FormControl"
import Authentication from "../../lib/Authentication"
import { redirect } from "next/navigation"


interface LoginPadgeProps {
    searchParams: {
        redirect?: string
    }
}


const LoginPage = (props: any) => {
    
    const redirectPath = props.searchParams.redirect || "/dashboard"
    const submit = async (formData: FormData) => {
        "use server"
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        await Authentication.instance.login(username, password)

        redirect(redirectPath)
        
    }


    return <form className="flex flex-col flex-1 gap-10" action={submit}>
        <h1 className="text-3xl">Login Page</h1>
        <FormControl label="Username" id="username">
        <input type="text" name="username" id="username" className="input"  />
        </FormControl>
        <FormControl label="Password" id="password">
        <input type="password" name="password" id="password" className="input"  />
        </FormControl>
        
    
        <button className="btn btn-primary">Login</button>
    </form>
}

export default LoginPage