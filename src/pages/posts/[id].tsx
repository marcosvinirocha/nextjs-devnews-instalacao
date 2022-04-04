import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Comment {
  id: string;
  body: string;
}

interface CommentsProps {
  comments: Comment[];
}

export default function Posts({ comments }: CommentsProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>Post {router.query.id}</h1>
      <ul>
        {comments.map(comments => (
          <li key={comments.id}>{comments.body}</li>
        ))}
      </ul>
    </>
  );
}

//criar pagina estatica com parametros
export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch('http://localhost:3333/posts');
  // const posts = await res.json();
  // const paths = posts.map(post => {
  //   return {
  //     params: { id: String(post.id) },
  //   };
  // });
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CommentsProps> = async context => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3333/comments?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments,
    },
    revalidate: 5, // In seconds
  };
};
