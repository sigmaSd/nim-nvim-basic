
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.nim = {
  install_info = {
    url = "https://github.com/aMOPel/tree-sitter-nim",
    revision = "795aef0df5385f36283a56512243e2e368db959d",
    files = { "src/parser.c", "src/scanner.cc" },
    branch = "main",
  },
  maintainers = { "@j-james" },
  filetype = "nim"
}
