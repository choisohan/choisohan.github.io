import fs from 'fs'
import matter from 'gray-matter';
import { headers } from 'next/headers';

export interface ProjectMetadata
    {
        title:string,
        start: string,
        end: string,
        thumbnail: string,
        slug:string,
        tags:string
      }


      
export const getProjectMetadatas = () =>{
  
    const folder = `public/projects/`;
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file)=> file.endsWith('.md'));
    
    const posts = markdownPosts.map((fileName)=>{
      const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
      const matterResult = matter(fileContents);
      return {
        title: matterResult.data.title,
        start: matterResult.data.start,
        thumbnail: matterResult.data.thumbnail,
        tags: matterResult.data.tags,
        slug: fileName.replace('.md',''),
      }
    }).sort( (a,b) => new Date(a.start).getTime() - new Date(b.start).getTime() )

    return posts
}

