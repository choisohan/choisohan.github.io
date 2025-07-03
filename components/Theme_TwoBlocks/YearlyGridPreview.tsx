import Link from "next/link";
import { ProjectMetadata , getProjectMetadatas  } from "../ProjectMetadata"
import { TagButton } from "./ClientComponents";

const getYears = (projects:any)=>{
    const years = [];
    if(projects.length > 0 ){
        for(var i = new Date( projects[0].start).getFullYear(); i <= new Date().getFullYear(); i++ ){
            years.push(i);
        }
    }

    return years; 
}


const Thumbnail = (props:any)=>{
    const className = `thumbnail ${props.className} select-none `
    if(props.path){
       if(props.path.toLowerCase().includes('mov') || props.path.toLowerCase().includes('mp4') ){
          return <video muted loop autoPlay className={className}><source src={props.path} /></video>
       }else{
          return <img src ={props.path} className={className} />
       }
    }
}

const ProjectPreview = (item:ProjectMetadata) =>{
    return <Link href={`/p/${item.slug}`} className={`project-preview relative group rounded-md  leading-tight overflow-hidden bg-black ${item.tags.toLowerCase().replace(/,/g,' ')}`}>

        <Thumbnail path={item.thumbnail} className="object-cover h-32 w-auto group-hover:opacity-50 " />


        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full opacity-0 group-hover:opacity-100 z-100">
            <span className="text-white font-bold text-lg leading-none	">{item.title}</span>
            <br />
            {item.tags.split(',').slice(0, 3).map(tag =>(
                <TagButton name={tag} className='text-xs' />
            ))}
        </div>


    </Link>

}

const YearlyGridPreview = (props:any)=>{

    const projects = getProjectMetadatas(); 

    return <div className={`${props.className} overflow-scroll flex flex-col gap-5 [body[type=blog]_&]:full`} >
        
        {getYears(projects).reverse().map( year =>
{
    if( projects.filter(project => new Date(project.start).getFullYear() == year ).length > 0   ){
        return <div>
            <div className="w-full text-xs font-bold text-gray-500">{year}</div>
            <div className="flex gap-2">
                {projects.filter(project => new Date(project.start).getFullYear() == year )
                        .map((project:any)=> ProjectPreview(project) ) }
            </div>
        </div>
    }
    else{
        return null; 
    }
}
        )}

    </div>
}

export default YearlyGridPreview