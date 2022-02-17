import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { FiCalendar, FiUser, FiClock } from "react-icons/fi";

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

export default function Post() {
  return (
    <>
      <Header margin="post" />
        <img className={styles.bannerImg} src="/banner.png" alt="Teste de banner" />
        <div className={commonStyles.container}>
          <div className={styles.headerTitle}>
            <h1>Criando um app CRA do zero</h1>
            <div>
              <span><FiCalendar /> 15 Mar 2021</span>
              <span><FiUser /> Joseph Oliveira</span>
              <span><FiClock /> 4 min</span>
            </div>
          </div>
        </div>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
