import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export interface Article {
    id: string;
    title: string;
    date: string;
    content?: string;
}

export function getArticleList(page: number = 1, pageSize: number = 5): Article[] {
    return list()
        .map(fileName => ({
            id: fileName.replace(/\.md$/, ''),
            ...read(fileName).data
        } as Article))
        .sort((a: any, b: any) => a.date < b.date ? 1 : -1)
        .slice((page - 1) * pageSize, pageSize);
}

export function getArticleIds() {
    return list().map(fileName => fileName.replace(/\.md$/, ''));
}

export async function getArticle(id: string): Promise<Article> {
    const matterResult = read(`${id}.md`);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    return {
        id,
        content: processedContent.toString(),
        ...matterResult.data
    } as Article;
}

function list(): string[] {
    return fs.readdirSync(path.join(process.cwd(), 'content'));
}

function read(name: string): matter.GrayMatterFile<string> {
    return matter(fs.readFileSync(path.join(process.cwd(), 'content', name), 'utf8'));
}