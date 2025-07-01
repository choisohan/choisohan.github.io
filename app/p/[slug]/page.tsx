import fs from 'fs';
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';
import { TagButton } from '@/components/Theme_TwoBlocks/ClientComponents';
import { getProjectMetadatas } from '@/components/ProjectMetadata';
import { ZoomableImage, ZoomableVideo } from '@/components/Lightbox';
import CodeBlock from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import rehypeRaw from "rehype-raw";

const getPostContent = (slug:string) =>{
    const folder = `public/projects/`;
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    return matterResult; 
}


export const generateStaticParams = async()=>{
    const posts = getProjectMetadatas();
    return posts.map(post =>({
        slug: post.slug
    }))
}


const PostPage = ( props:any ) => {
    const slug = props.params.slug;
    const post = getPostContent(slug); 

    return(
        <> 
            <h1 className='text-center mb-5  mr-5' >{post.data.title}</h1>
            <div className='justify-end gap-1 flex mb-10 mr-5' >{
                post.data.tags.split(',').map( ( tag : string, i : number) =>
                    <><TagButton name={tag}/>
                      { i < post.data.tags.length-1 ? ',' :'' }
                    </>
                )}
            </div>


            <div>
                
            <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    img:ZoomableImage,
                    video:ZoomableVideo,
                    code:CodeBlock}}>
            
                {post.content}
            </ReactMarkdown>
                        

            
            </div>
        </>

    )
}

export default PostPage