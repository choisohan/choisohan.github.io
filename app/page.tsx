import { TagButton } from "@/components/Theme_TwoBlocks/ClientComponents";

const Home = ()=>{
    const tags = ['Artist','Developer']
    
    return <div className='place-content-center text-center h-full'>
<div className="text-5xl leading-normal font-serif font-bold">
</div><br />
    <TagButton name='Artist'/> ,
    <TagButton name='Developer'/>

<br />
<span className="mt-10 text-sm">
    mjwithu09@gmail.com
</span>


    </div>
    


}

export default Home;