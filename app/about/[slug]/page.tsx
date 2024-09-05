import fs from 'fs';
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';
import { getAboutMetadatas } from '@/components/AboutMetadatas';
import { SetLayout } from '@/components/context/LayoutContext';

const getPostContent = (slug:string) =>{
    const folder = `public/abouts/`;
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    return matterResult; 
}


export const generateStaticParams = async()=>{
    const posts = getAboutMetadatas();
    return posts.map(post =>({
        slug: post.slug
    }))
}


const PostPage = ( props:any ) => {
    const slug = props.params.slug;
    const post = getPostContent(slug); 

    return(
    <> 
    <div><Markdown>{post.content}</Markdown></div>
    <SetLayout />
    </>
    )
}

export default PostPage