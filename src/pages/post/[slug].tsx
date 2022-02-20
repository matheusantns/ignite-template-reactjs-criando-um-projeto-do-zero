import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '../../components/Header'
import Prismic from '@prismicio/client'
import { useRouter } from 'next/router'
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from '@prismicio/helpers';

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

export default function Post(props: PostProps) {

  console.log(props.post.data.content)

  const router = useRouter();

  let words = [];

  props.post.data.content.map(item => {
    words.push(item.heading[0].text)
    item.body.map(itemFinal => {
      words.push(itemFinal.text)
    })
  })

  const wordsCounted = words.join(" ").split(" ").length
  const timeReading = Math.ceil(wordsCounted / 200);

  if (router.isFallback) {
    return <div className=".loading">Carregando...</div>
  }
  return (
    <>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
        <img className={styles.bannerImg} src={props.post.data.banner.url} alt="banner" />
        <div className={commonStyles.container}>
          <div className={styles.headerTitle}>
            <h1>{props.post.data.title}</h1>
            <div>
              <span><FiCalendar /> {dateFormat(props.post.first_publication_date)}</span>
              <span><FiUser /> {props.post.data.author}</span>
              <span><FiClock /> {timeReading} min</span>
            </div>
            <article className={styles.post}>
            {props.post.data.content.map((p, index) => {
              return (
                  <article key={index} className={styles.postArticle}>
                      <h3>{p.heading}</h3>
                      <p dangerouslySetInnerHTML={{ __html: prismicH.asHTML(p.body) }} />
                  </article>
              )
              }
              )}
        </article>
          </div>
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

export const getStaticProps = async context => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', context.params.slug, {});

  const post = {...response}

  return {
    props: {post}
  }
};
