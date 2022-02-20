import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '../../components/Header'
import Prismic from '@prismicio/client'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { FiCalendar, FiUser, FiClock } from "react-icons/fi";
import { dateFormat } from '../../utils/dateFormat';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: PostProps) {

  console.log(post)

  const router = useRouter();

  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length);
    words.map(word => (total += word));
    return total;
  }, 0);

  const readTime = Math.ceil(totalWords / 200);


  if (router.isFallback) {
    return <div className=".loading">Carregando...</div>
  }
  return (
    <>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
        <img className={styles.bannerImg} src={post.data.banner.url} alt="banner" />
        <div className={commonStyles.container}>
          <div className={styles.headerTitle}>
            <h1>{post.data.title}</h1>
            <div>
              <span><FiCalendar /> {dateFormat(post.first_publication_date)}</span>
              <span><FiUser /> {post.data.author}</span>
              <span><FiClock /> {readTime} min</span>
            </div>
            </div>
            {post.data.content.map((content, index) => {
              return (
                <article className={styles.post} key={index}>
                  <h2>{content.heading}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(content.body),
                    }}
                  />
                </article>
          );
        })}

        </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths  = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'posts')
  );

  const allBlogPosts = [];

  posts.results.map(post => {
    allBlogPosts.push({ params: {slug: post.uid} })
  })

  return {
    paths: allBlogPosts,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(context.params.slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {post},
    revalidate: 1 * 60 * 30 // 30 minutes
  }
};
