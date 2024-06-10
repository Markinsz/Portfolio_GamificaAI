import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoV from "./images/logo-vertical.png";
import control from "./images/controguete.png";

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_biblioteca.tsx?url"

import tmxMapaPath from "./maps/mapa.tmx?url"
import { TiledResource } from "@excaliburjs/plugin-tiled";

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  LogoV: new ImageSource(logoV),
  Control: new ImageSource (control),
  Mapa: new TiledResource(tmxMapaPath, {
      pathMap: [
        {path: "mapa.tmx", output: tmxMapaPath},
        {path: "Room_Builder_32x32.png", output: pngTilesetPath},
        {path: "tileset_paredes.tsx", output: tsxParedesPath},
        {path: "tileset_estoque.tsx", output: tsxEstoquePath},
        {path: "tileset_generic.tsx", output: tsxGenericPath},
        {path: "tileset_biblioteca.tsx", output: tsxBibliotecaPath} 
      ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
