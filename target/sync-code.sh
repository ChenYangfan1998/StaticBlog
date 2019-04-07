#!/usr/bin/env bash

# 这个脚本用来在文件更改之后同步刷新浏览器，需要安装browser-sync

browser-sync start --server --files "**/*"
