// package.ts

interface Package {
    name: string;
    version: string;
    description?: string;
    main?: string;
    scripts?: {
        [key: string]: string;
    };
    repository?: {
        type: string;
        url: string;
    };
    keywords?: string[];
    author?: string;
    license?: string;
    bugs?: {
        url: string;
    };
    homepage?: string;
}

const examplePackage: Package = {
    name: "example-package",
    version: "1.0.0",
    description: "This is an example package",
    main: "index.js",
    scripts: {
        start: "node index.js",
        test: "echo \"Error: no test specified\" && exit 1"
    },
    repository: {
        type: "git",
        url: "https://github.com/example/example-package.git"
    },
    keywords: ["example", "package"],
    author: "Example Author",
    license: "ISC",
    bugs: {
        url: "https://github.com/example/example-package/issues"
    },
    homepage: "https://github.com/example/example-package#readme"
};

console.log(examplePackage);