import { PostMetadata } from './PostMetadata';
import Link from 'next/link';

const PostPreview =( props: PostMetadata )=>{
   return  <div><h2>
      <Link href={`/posts/${props.slug}`}>{props.slug}</Link>
      </h2>{props.title}
      <p>{props.date}</p>
      </div>
}
export default PostPreview; 