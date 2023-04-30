import {
    VT323,
} from 'next/font/google';

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const Admin = () => {
    return (
        <main className="bg-black min-h-screen">
            <div className={`${vt323.variable} font-vt323 w-72 h-screen mx-auto flex flex-col justify-center text-2xl`}>
                <form className="flex flex-col" action="/send-data-here" method="post">
                    <label for="username">Username:</label>
                    <input className="text-black" type="text" id="first" name="first" />
                    <label className='mt-2' for="password">Password:</label>
                    <input className="text-black" type="text" id="last" name="last" />
                    <button className="mt-5 text-white border-2 border-white" type="submit">Login</button>
                </form>
            </div>
        </main>
    )
}

export default Admin