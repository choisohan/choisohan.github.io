import fs from 'fs'
import matter from 'gray-matter';

export interface AboutMetadata
    {
        title:string,
        slug:string
      }

      
export const getAboutMetadatas = () =>{
  
    const folder = `public/abouts/`;
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file)=> file.endsWith('.md'));
    
    const posts = markdownPosts.map((fileName)=>{
      const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
      const matterResult = matter(fileContents);
      return {
        title: matterResult.data.title,
        slug: fileName.replace('.md',''),
      }
    })

    return posts
}

