local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.nim = {
  install_info = {
    url = "https://github.com/aMOPel/tree-sitter-nim",
    files = { "src/parser.c", "src/scanner.cc" },
    branch = "main",
  },
  maintainers = { "@theHamsta" },
  filetype = "nim"
}
