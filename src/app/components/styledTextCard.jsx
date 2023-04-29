import {
    VT323,
} from 'next/font/google';

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const StyledTextCard = ({ icon, text, gradientColor }) => {
    return (
        <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${gradientColor} opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
            <div className="relative px-4 py-1 xl:px-6 xl:py-3 bg-black leading-none flex items-center divide-x divide-gray-600 cursor-pointer">
                <span className="flex items-center space-x-5">
                    {icon}
                    <span className={`${vt323.variable} font-vt323 text-2xl xl:text-3xl text-gray-100`}>{text}</span>
                </span>
            </div>
        </div>
    )
}

export default StyledTextCard