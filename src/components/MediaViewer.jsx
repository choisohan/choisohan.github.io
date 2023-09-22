import React ,{  useEffect, useState } from 'react'
import '../css/MediaViewer.css'
import { getFileType } from '../js/utils'
import Popup from './Popup'
import ReactDOM from 'react-dom';


const MediaViewer = props => {

  const [thumbnail, setThumbnail] = useState(props.thumbnail || props.src)
  const [type, setType] = useState(getFileType(props.src))
  const [trigger, setTrigger] = useState()


  return (<>
  <div className='mediaViewer' onClick={()=>{setTrigger(true)}} description={props.description} >
    {type == 'img' ?
            <img src={"/media/"+thumbnail } /> :
        type =='video' ?
            <video loop autoPlay muted><source src ={'/media/'+ thumbnail } /></video>
        :null 
    }

  </div>


  <Popup trigger={trigger} setTrigger={setTrigger}>
  {type == 'img' ?
            <img src={"/media/"+props.src } /> :
        type =='video' ?
            <video controls loop><source src ={'/media/'+ props.src} /></video>
        :null 
    }
  </Popup> 


  </>
  )
}
export default MediaViewer