import React  from 'react'
import MediaViewer from '../components/MediaViewer';



const Professional = () => {

  return (
    <div className='grid scatter'>

<MediaViewer src= 'unity_bobo.mp4' description='Realtime Interactive Orangutan AI, Unity3D'/>

  <div className='flex scatter'>
    <MediaViewer src='game_facial.gif' description='Facial Model/Rig for a AAA Game' />
    <MediaViewer src= 'unity_beluga.mp4' thumbnail ={null} description='Realtime Beluga Whale AI, Unity3D'/>
    <MediaViewer src='anim_otter.jpg' description='Character Modeling for an animation' />
  </div>

    </div>
  )
}

export default Professional


