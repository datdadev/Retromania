# Retromania

## About
Retromania is a best, beautiful, retro-styled retro site that serves as an emulator for numerous games from various consoles throughout the decades. It provides a nostalgic gaming experience, allowing users to relive the golden age of gaming. With Retromania, you can dive into the world of retro gaming and enjoy a vast collection of classic games from various consoles, all in one immersive platform. The repository is built using [ReactJS](https://react.dev/blog/2023/03/16/introducing-react-dev) with the [NextJS](https://nextjs.org) framework, offering a seamless and interactive user interface.

## Disclaimer
Please note that "Retromania" is a trademarked name and this repository is provided for personal and educational purposes only. It is not intended for commercial use or public deployment. We kindly ask users not to publish or distribute this repository under the name "Retromania" without proper authorization.

## Installation

1. Clone the repository to your local machine.
2. Create a file named `.env.local` in the root directory of the project.
3. Set up the following environment variables in the `.env.local` file:
   - `NEXT_PUBLIC_CLIENT_ID`: Obtain this from the igdb database of Twitch. Refer to the documentation at [https://api-docs.igdb.com/#getting-started](https://api-docs.igdb.com/#getting-started) for more information.
   - `NEXT_PUBLIC_ACCESS_TOKEN`: Use the key provided by igdb of Twitch. Visit [https://api-docs.igdb.com/#getting-started](https://api-docs.igdb.com/#getting-started) for instructions on obtaining the access token.
   - `NEXT_PUBLIC_ROMS_URL`: Specify the URL of the server hosting the ROMs for consoles in the correct order. You can use a static file server like [https://hub.docker.com/r/halverneus/static-file-server](https://hub.docker.com/r/halverneus/static-file-server). Make sure to include a trailing slash (`/`) at the end of the URL.
   - `NEXT_PUBLIC_CORS_URL`: Provide the URL of the server hosting the CORS proxy to avoid CORS blocking from the igdb API. You can use a CORS proxy like [https://github.com/Rob--W/cors-anywhere](https://github.com/Rob--W/cors-anywhere). Remember to include a trailing slash (`/`) at the end of the URL.

> Note: If you are using a different static file server, make sure to adjust the regular expression syntax accordingly to match your setup.
4. Run `yarn install` or `npm install` to install the project dependencies.
5. Run `yarn dev` or `npm run dev` to start the development server.

## Contributions
Users are welcome to contribute to the repository by submitting pull requests or using it for testing and personal hosting purposes. However, we advise against publicly deploying or using this repository commercially without obtaining proper authorization for the "Retromania" name and any copyrighted content included within.
