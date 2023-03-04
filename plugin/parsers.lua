local list = require "nvim-treesitter.parsers".get_parser_configs()
list.nim = {
  install_info = {
    url = "https://github.com/aMOPel/tree-sitter-nim",
    files = { "src/parser.c", "src/scanner.cc" },
    branch = "main",
  },
  maintainers = { "@j-james" },

}