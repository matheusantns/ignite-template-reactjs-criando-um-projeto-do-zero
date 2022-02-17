import { GetStaticProps } from 'next';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { FiCalendar, FiUser } from "react-icons/fi";

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

export default function Home() {
 return (
   <>
    <Header margin="home" />
      <div className={commonStyles.container}>
        <div className={styles.postInfo}>
          <h2>Como utilizar Hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
          <span><FiCalendar /> 15 Mar 2021</span>
          <span><FiUser /> Joseph Oliveira</span>
          </div>
        </div>
        <div className={styles.postInfo}>
          <h2>Como utilizar Hooks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div>
            <span><FiCalendar /> 15 Mar 2021</span>
            <span><FiUser /> Joseph Oliveira</span>
          </div>
        </div>
        <div className={styles.loadMore}>Carregar mais posts</div>
    </div>
   </>
 )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
