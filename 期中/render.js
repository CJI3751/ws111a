export function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
        color:White;
        background-color:Gray
      }
  
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],input[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text],input[type=password] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function loginUi() {
  return layout('Login', `
  <h1>登陸</h1>
  <form action="/login" method="post">
    <p><input type="text" placeholder="用戶名稱" name="username"></p>
    <p><input type="password" placeholder="密碼" name="password"></p>
    <p><input type="submit" value="登錄"></p>
    <p>新用戶? <a href="/signup">建立新帳號</p>
    <p><a href="JavaScript:window.history.back()">回上一頁</a></p> 
  </form>
  `)
}

export function signupUi() {
  return layout('Signup', `
  <h1>註冊</h1>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="用戶名稱" name="username"></p>
    <p><input type="password" placeholder="密碼" name="password"></p>
    <p><input type="text" placeholder="email" name="email"></p>
    <p><input type="submit" value="註冊"></p>
    <p><a href="JavaScript:window.history.back()">回上一頁</a></p> 
  </form>
  `)
}

export function success() {
  return layout('註冊成功', `
  <h1>Success!</h1>
  你可以 <a href="/">瀏覽所有貼文</a> / <a href="/login">登陸</a> again !
  `)
}

export function fail() {
  return layout('錯誤', `
  <h1>Fail!</h1>
  你可以 <a href="/">瀏覽所有貼文</a> or <a href="JavaScript:window.history.back()">返回</a> !
  `)
}

export function list(posts, user) {
  console.log('list: user=', user)
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${ post.title } -- by ${post.username}</h2>
      <p><a href="/post/${post.id}">Read post</a></p>
    </li>
    `)
  }
  let content = `
  <h1>貼文</h1>
  <p>${(user==null)?'<a href="/login">註冊</a>以建立貼文':'歡迎 '+user.username+', 你可以 <a href="/post/new">建立貼文</a> or <a href="/logout">登出</a> !'}</p>
  <p>有 <strong>${posts.length}</strong>則貼文!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="標題" name="title"></p>
    <p><textarea placeholder="內容" name="body"></textarea></p>
    <p><input type="submit" value="建立"></p>
  </form>
  <p><a href="JavaScript:window.history.back()">回上一頁</a></p> 
  `)
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title} -- by ${post.username}</h1>
    <p>${post.body}</p>
    <p><a href="/del/${post.id}">刪除貼文</a></p>
    <p><a href="JavaScript:window.history.back()">回上一頁</a></p> 
  `)
}
