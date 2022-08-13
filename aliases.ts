import path from "path";
import moduleAlias from "module-alias";

const root = __dirname;
const pathResolve = (p: string) => path.resolve(root, p);

moduleAlias.addAlias("@root", pathResolve("."));
moduleAlias.addAlias("@client", pathResolve("./src/client"));
moduleAlias.addAlias("@server", pathResolve("./src/server"));
moduleAlias.addAlias("@shared", pathResolve("./src/shared"));
