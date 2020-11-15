import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getArticleList } from '../repository/articles'

export default function ArticleList({ articles }) {
    return (
        <div>
            <Head>
                <title>Mon super Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Articles</h1>

            {articles.map(({ id, date, title }) => (
                <Link href={`/${id}`} key={id}>
                    <div className="article">
                        <h3>{title}</h3>
                        <div>{date}</div>
                    </div>
                </Link>
            ))}

            <style jsx>{`
                .article {
                    background: #eaeaea
                    padding: 10px 20px;
                    margin: 20px 0;
                }
            `}</style>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            articles: getArticleList()
        }
    }
}