# 其余工具

1. md 转 html：推荐使用 marked.js

```
CLI: npm install -g marked
```

```
$ marked -o hello.html
hello world
^D
$ cat hello.html
<p>hello world</p>
```

在input.md中输入文件，在out.html中获取生成的html文件
