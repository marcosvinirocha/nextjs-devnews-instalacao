import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.scss';

interface Post {
  id: string;
  title: string;
}

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3333/posts')
  //     .then(res => res.json())
  //     .then(data => setPosts(data));
  // }, []);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

//os dados que vão para o front-end são obtidos através de uma função getServerSideProps
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('http://localhost:3333/posts');
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};
