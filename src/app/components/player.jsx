'use client'
import InnerHTML from 'dangerously-set-html-content'

const Player = ({ gameUrl = 'https://zlink.ddns.net/roms/Super-Mario-Bros..nes' }) => {
    const html = `
        <div class="aspect-[4/3]">
            <div id="game"></div>
        </div>
        <script type="text/javascript">
            EJS_player = '#game';
            EJS_biosUrl = ''; // Url to Famicom Disk System bios
            EJS_gameUrl = '${gameUrl}'; // Url to Game rom
            EJS_core = 'nes'; // Optional core: mesen, nestopia
            EJS_lightgun = false; // Lightgun
        </script>
        <script src="https://www.emulatorjs.com/loader.js"></script>
    `
    return <InnerHTML html={html} />
}

export default Player;