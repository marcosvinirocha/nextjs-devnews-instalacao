import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../../components/Header/SEO';
import styles from './post.module.scss';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    update: string;
  };
}

export default function Posts({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <SEO title="Post " />
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.update}</time>
          <div className={styles.content}>{post.content} </div>
        </article>
      </main>
    </>
  );
}

//criar pagina estatica com parametros
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});
  const post = {
    slug,
    title: response.data.title,
    content: RichText.asText(response.data.content),
    update: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };
  console.log(response.data);

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 12, // in hours
  };
};
