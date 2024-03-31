import Link from 'next/link';
import getPostMetadatas from '@/components/GetPostMetadatas';
import PostPreview from '@/components/PostPreview';

const Home = ()=>{

  const postMetadatas = getPostMetadatas();
  const postPreview = postMetadatas.map(post=>(
    <PostPreview key={post.slug} {...post} />
  ))



  return <h1>{postPreview}</h1>
}

export default Home;