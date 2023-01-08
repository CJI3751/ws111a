import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

const router = new Router();

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
  let list = []
  for (const [id, title, body] of db.query(sql)) {
    list.push({id, title, body})
  }
  return list
}

async function list(ctx) {
  let posts = query("SELECT id, title, body FROM posts")
  console.log('list:posts=', posts)
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}
