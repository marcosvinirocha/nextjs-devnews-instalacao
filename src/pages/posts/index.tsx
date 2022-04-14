import { GetStaticProps } from 'next';
import SEO from '../../components/Header/SEO';
import Link from 'next/link';
import styles from './posts.module.scss';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  update: string;
}

interface PostsProps {
  posts: Post[];
}
export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <SEO title="Posts " />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href="#">
              <a href="#">
                <time>{post.update} </time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      orderings: '[document.first_publication_date desc]',
      fetch: ['post.title', 'post.content'],
    },
  );
  const posts = response.results.map(post => ({
    slug: post.uid,
    title: post.data.title,
    content:
      post.data.content.find(content => content.type === 'paragraph')?.text ??
      '',
    update: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));
  console.log(response.results);

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 12, //in seconds reload component e search new data in API
  };
};
