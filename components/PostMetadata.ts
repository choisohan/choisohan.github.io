

import fs from 'fs'
import matter from 'gray-matter';

export interface PostMetadata
    {
        title:string,
        date: string,
        slug:string,
      }

      
export const getPostMetadatas =():PostMetadata[]=>{
    const folder = `public/posts/`;
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file)=> file.endsWith('.md'));
    const posts = markdownPosts.map((fileName)=>{
      const fileContents = fs.readFileSync(`public/posts/${fileName}`, "utf8");
      const matterResult = matter(fileContents);
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        slug: fileName.replace('.md','')
      }
    })
    return posts;
  
}
