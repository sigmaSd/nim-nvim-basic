import { ensureDirSync } from "https://deno.land/std@0.178.0/fs/ensure_dir.ts";
import * as path from "https://deno.land/std@0.178.0/path/mod.ts";
import { $ } from "https://deno.land/x/dax@0.28.0/mod.ts";

const cwd = Deno.cwd();
Deno.chdir(Deno.makeTempDirSync());
await $`git clone --depth 1 --single-branch https://github.com/j-james/nvim-treesitter`;

ensureDirSync(path.join(cwd, "./plugin"));
ensureDirSync(path.join(cwd, "./queries/nim"));

await $`cp nvim-treesitter/lua/nvim-treesitter/parsers.lua ${
  path.join(cwd, "./plugin/")
}`;
keepOnlyNim(path.join(cwd, "./plugin/parsers.lua"));

await $`cp nvim-treesitter/queries/nim/highlights.scm ${
  path.join(cwd, "./queries/nim")
}`;
await $`cp nvim-treesitter/queries/nim/indents.scm ${
  path.join(cwd, "./queries/nim")
}`;

function keepOnlyNim(path: string) {
  function findNextMatchingBraceIndex(str: string, startIndex: number) {
    // find and get past the next `{`
    while (str[startIndex] !== "{") startIndex++;
    startIndex++;

    let openBraces = 1;
    for (let i = startIndex + 1; i < str.length; i++) {
      if (str[i] === "{") {
        openBraces++;
      } else if (str[i] === "}") {
        openBraces--;
        if (openBraces === 0) return i;
      }
    }
    throw "no matching brace";
  }
  const lua = Deno.readTextFileSync(path);
  const start = lua.indexOf("list.nim");
  const end = findNextMatchingBraceIndex(lua, start);

  Deno.writeTextFileSync(
    path,
    `local list = require "nvim-treesitter.parsers".get_parser_configs()
${lua.slice(start, end + 1)}`,
  );
}
