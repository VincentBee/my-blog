import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { getArticleIds, getArticle } from '../repository/articles'


export default function ArticleShow({ article }) {
    return (
        <div>
            <Head>
                <title>{article.title}</title>
            </Head>

            <div className="article">
                <h1 className="title">{article.title}</h1>
                <div className="date">{article.date}</div>
                <div className="content" dangerouslySetInnerHTML={{ __html: article.content }} />

                <style jsx>{`
                    .title {
                        font-size: 40px;
                    }
                    .date {
                        color: #6e6e6e;
                    }
                    .content {
                        margin-top: 20px
                    }
                `}</style>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const article = await getArticle(context.params.id.toString())
    return {
        props: {
            article
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getArticleIds().map(id => ({
            params: { id }
        })),
        fallback: false
    }
}