"use-client"
import ErrorPage from '../not-found.js';
import CONSOLE from '../components/console.js';

import platforms from "../../../public/assets/jsons/platforms.json"
const consoles = Object.keys(platforms);

export default function Page({ params }) {
    const { console } = params;

    // Check if the console value is in the desired consoles list
    const isValidConsole = consoles.includes(console);

    if (!isValidConsole) {
        // Render the 404 page if the console is not valid
        return <ErrorPage statusCode={404} />;
    }

    // Render the page content for the valid console
    return (
        <CONSOLE _type={console} _fileType={platforms[console].fileType} />
    );
}
