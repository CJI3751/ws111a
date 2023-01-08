import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <style>
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page(`
       <form action="" method="post">
         <input type="text" name="使用者" value="" placeholder="使用者名稱"/>
         <input type="password" name="password" value="" placeholder="Password"/>
         <input type="button" href="/home" name = "submit" value = "提交" id="btn"/>
       </form>
    `)
  } else {
    ctx.response.body = page(`
      <h1>潘敏驛的網站</h1>
      <input type="button" onclick="location.href='http://127.0.0.1:8000/login';" value="登錄" />
      
    `)
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
