import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Prismic from '@prismicio/client';
import Link from 'next/link'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { FiCalendar, FiUser } from "react-icons/fi";
import { useState } from 'react';
import { dateFormat } from '../utils/dateFormat';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps) {

  const [nextPage, setNextPage] = useState(props.postsPagination.next_page)
  const [posts, setPosts] = useState(props.postsPagination.results)

  function handleLoadMore() {
    fetch(props.postsPagination.next_page)
    .then(response => response.json())
    .then(data => {
      setNextPage(data.next_page)
      setPosts(posts.concat(data.results))
    })
  }

 return (
   <>
      <div className={styles.headerWrapper}>
      <Header />
      </div>
    <div className={commonStyles.container}>
        {posts.map(post =>
        <div key={post.uid} className={styles.postInfo}>
          <h2><Link href={`/post/${post.uid}`}>{post.data.title}</Link></h2>
          <p>{post.data.subtitle}</p>
          <div>
            <span><FiCalendar /> {
              dateFormat(post.first_publication_date)
              }
              </span>
            <span><FiUser /> {post.data.author}</span>
          </div>
        </div>
        )}
      {nextPage && <div onClick={handleLoadMore} className={styles.loadMore}>Carregar mais posts</div>}
  </div>
   </>
 )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('', {pageSize: 1})

  const postsPagination = {...postsResponse}

  return {props: {postsPagination}}
};
