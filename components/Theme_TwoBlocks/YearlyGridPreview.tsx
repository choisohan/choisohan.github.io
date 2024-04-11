import Link from "next/link";
import { ProjectMetadata , getProjectMetadatas  } from "../ProjectMetadata"

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
    const className = `${props.className} select-none  `
    if(props.path){
       if(props.path.toLowerCase().includes('mov') || props.path.toLowerCase().includes('mp4') ){
          return <video muted loop autoPlay className={className}>
                        <source src={props.path} /></video>
       }else{
          return <img src ={props.path} className={className} />
       }
    }
}

const ProjectPreview = (item:ProjectMetadata) =>{
    return <Link href={`/p/${item.slug}`}
        className={`project-preview bg-slate-200 w-32 h-32 overflow-hidden transform hover-scale ${item.tags.replace(/,/g,' ')}`}>
        <Thumbnail path={item.thumbnail} className="w-full h-full object-cover" />
    </Link>

}

const YearlyGridPreview = (props:any)=>{



    const projects = getProjectMetadatas(); 

    return <div className={`${props.className} overflow-scroll h-full flex flex-col gap-5`} >
        
        {getYears(projects).reverse().map( year =>
            <div>
                <div className="w-full">{year}</div>
                <div className="flex gap-2">
                    {projects.filter(project => new Date(project.start).getFullYear() == year )
                            .map(project=> ProjectPreview(project) ) }
                </div>
            </div>
        )}

    </div>
}

export default YearlyGridPreview