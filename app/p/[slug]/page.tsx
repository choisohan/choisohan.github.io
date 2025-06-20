import fs from 'fs';
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';
import { TagButton } from '@/components/Theme_TwoBlocks/ClientComponents';
import { getProjectMetadatas } from '@/components/ProjectMetadata';
import { ZoomableImage, ZoomableVideo } from '@/components/Lightbox';

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


            <div><Markdown options={{overrides:{
                img:{component: ZoomableImage},
                video: { component: ZoomableVideo }
            }}}>
            {post.content}</Markdown></div>
        </>

    )
}

export default PostPage