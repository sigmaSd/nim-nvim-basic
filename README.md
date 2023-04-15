# nim-nvim-basic
Add nim syntax highlighting to nvim via tree sitter

## Install

Add the plugin

```
'sigmaSd/nim-nvim-basic'
```

```lua
{
    'sigmaSd/nim-nvim-basic'
    config = function()
        require("nim-nvim").setup()
    end,
    -- If you're using Lazy, you can lazy load this plugin on file type event == "nim"
    ft="nim"
}
```

Then run `:TSInstall nim`

## Info

Based on https://github.com/nvim-treesitter/nvim-treesitter/pull/4439

Using https://github.com/aMOPel/tree-sitter-nim
