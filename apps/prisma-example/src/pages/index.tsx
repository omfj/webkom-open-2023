import Head from 'next/head'
import { PrismaClient } from '@prisma/client'

type Props = {
  posts: {
    id: number
    title: string
    content: string
    createdAt: Date
  }[]
}

export default function Home({ posts }: Props) {

  const handleAddPost = async () => {
    await fetch("/api/add", {
      method: "POST",
    });
  }

  const handleDeletePost = async (id: number) => {
    await fetch("/api/remove", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Next.js!</h1>
        <div className="feed">
          {posts.map((post) => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>
                Remove post
              </button>
              <p>{post.id}</p>
            </div>
          ))}
        </div>
        <button className="btn" onClick={handleAddPost}>Add post</button>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}