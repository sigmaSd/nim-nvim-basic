import * as toml from "https://deno.land/std@0.178.0/encoding/toml.ts";
import { ensureDirSync } from "https://deno.land/std@0.178.0/fs/ensure_dir.ts";

// gets queries
ensureDirSync("./queries/nim");
await fetch(
  "https://raw.githubusercontent.com/j-james/helix/nim/runtime/queries/nim/highlights.scm",
).then((r) =>
  r.body?.pipeTo(Deno.createSync("./queries/nim/highlights.scm").writable)
);
// FIXME: Indents seems to not work with indent-blankline.nvim
// await fetch(
//   "https://raw.githubusercontent.com/j-james/helix/nim/runtime/queries/nim/indents.scm",
// ).then((r) =>
//   r.body?.pipeTo(Deno.createSync("./queries/nim/indents.scm").writable)
// );

// Note: does nvim even use this?
await fetch(
  "https://raw.githubusercontent.com/j-james/helix/nim/runtime/queries/nim/textobjects.scm",
).then((r) =>
  r.body?.pipeTo(Deno.createSync("./queries/nim/textobjects.scm").writable)
);

// get grammar
const grammar = await fetch(
  "https://raw.githubusercontent.com/j-james/helix/nim/languages.toml",
  // deno-lint-ignore no-explicit-any
).then((r) => r.text()).then((r) => toml.parse(r)).then((r: any) => {
  // deno-lint-ignore no-explicit-any
  const source = r.grammar.find((r: any) => r.name === "nim")!.source;
  return { url: source.git, revision: source.rev };
});

const mainLua = `
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.nim = {
  install_info = {
    url = "${grammar.url}",
    revision = "${grammar.revision}",
    files = { "src/parser.c", "src/scanner.cc" },
    branch = "main",
  },
  maintainers = { "@j-james" },
  filetype = "nim"
}
`;
ensureDirSync("./plugin");
Deno.writeTextFileSync("./plugin/main.lua", mainLua);
