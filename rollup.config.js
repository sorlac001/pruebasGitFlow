import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from 'rollup-plugin-css-only';
// library that helps you import in svelte with
// absolute paths, instead of
// import Component  from "../../../../components/Component.svelte";
// we will be able to say
// import Component from "components/Component.svelte";
import alias from "@rollup/plugin-alias";
import fs from "fs";

const production = !process.env.ROLLUP_WATCH;

let environment = process.env.npm_lifecycle_event;

// configure aliases for absolute imports
const aliases = alias({
  resolve: [".svelte", ".js"], //optional, by default this will just look for .js files or folders
  entries: [
    { find: "components", replacement: "src/components" },
    { find: "views", replacement: "src/views" },
    { find: "assets", replacement: "src/assets" },
  ],
});



const ProdEnviromentSvelteTemplate = `<script context="module">
export const env = {
  stage: "{{_ENV_}}",
  api: {
      url: "https://i6u3l5bzrbfldgkdy7yrbhj4hy.appsync-api.us-east-2.amazonaws.com/graphql",
      key: "da2-xiswyvcqqbadfm5ygtlkcnxqom",
      proxy:{
          url: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/api",
          auth: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
      },
      prod:{
          url: "https://prod.izziapiweb.mx/izziuxp-web-oc/v1/api",
          auth: "https://prod.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
      }
  },
  api2:{
      prod:{
          url: "https://prod.izziapiweb.mx/izzimovil/api/v1",
          auth: "https://prod.izziapiweb.mx/izzimovil/api/v1/auth/login",
          key : "s2rSgtQLFty53nRivAntWYZhUnrP036y"
      }
  }
};
</script>
`;

const AllEnviromentSvelteTemplate = `<script context="module">
  export const env = {
    stage: "{{_ENV_}}",
    api: {
        url: "https://i6u3l5bzrbfldgkdy7yrbhj4hy.appsync-api.us-east-2.amazonaws.com/graphql",
        key: "da2-xiswyvcqqbadfm5ygtlkcnxqom",
        proxy:{
            url: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/api",
            auth: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
        },
        dev:{
            url: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/api",
            auth: "https://dev.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
        },
        test:{
            url: "https://test.izziapiweb.mx/izziuxp-web-oc/v1/api",
            auth: "https://test.izziapiweb.mx/izziuxp-web-oc/v1/auth/loginOC"
        }
    },
    api2:{
        dev:{
            url: "https://dev.izziapiweb.mx/izzimovilapi/dev",
            auth: "https://dev.izziapiweb.mx/izzimovilapi/auth/dev/login",
            key : "ypgx9tIp6PbmZlnFJiA5vvUnW1WeAHaT"	
        },
        test:{
            url: "https://test.izziapiweb.mx/izzimovilapi/test",
            auth: "https://test.izziapiweb.mx/izzimovilapi/auth/test/login",
            key : "EV5JPlu9OdSt3rZt1gSYnBSbeRRUVi5O"			
        }
    }
};
</script>
`;

const indexTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1'>

    <title>Svelte app</title>
    <script>
        if (process === undefined) {
            var process = { env: {} };
        }
    </script>
    <link rel='icon' type='image/png' href='/favicon.png'>
    <link rel='stylesheet' href='/global.css'>   
    <link rel='stylesheet' href='/build/bundle.css'>   
    <link rel='stylesheet' type='text/css' href='/assets/styles/index.css'>

    <script src="/assets/scripts/crypto-js.min.js"></script>
    <script src="/assets/scripts/model.js"></script>
    <script defer src='/build/bundle.js'></script>
    <script defer src='/assets/scripts/main.min.js'></script>
    <script defer src='/assets/scripts/alasql.min.js'></script>
</head>

<body>
    <div id="app"></div>
</body>

</html>
`;

environment = environment == "build" ? "prod" : environment;
let EnviromentSvelteTemplate = environment == "prod"? ProdEnviromentSvelteTemplate : AllEnviromentSvelteTemplate;
fs.writeFileSync(
  "./src/Enviroment.svelte",
    EnviromentSvelteTemplate
    .replace("{{_ENV_}}", environment)
);

if (production) {
  fs.writeFileSync(
    "./public/index.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/notus-svelte")
  );
  fs.writeFileSync(
    "./public/200.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/notus-svelte")
  );
  fs.writeFileSync(
    "./public/404.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/notus-svelte")
  );
} else {
  fs.writeFileSync(
    "./public/index.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
  fs.writeFileSync(
    "./public/200.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
  fs.writeFileSync(
    "./public/404.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production      
    }),
    // we'll extract any component CSS out into
		// a separate file - better for performance
    css({ output: 'bundle.css' }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // for absolut imports
    // i.e., instead of
    // import Component  from "../../../../components/Component.svelte";
    // we will be able to say
    // import Component from "components/Component.svelte";
    aliases,
  ],
  watch: {
    clearScreen: false,
  },
};
