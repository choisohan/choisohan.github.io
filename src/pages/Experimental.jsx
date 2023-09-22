import React  from 'react'
import MediaViewer from '../components/MediaViewer'
const Experimental = () => {

  return (<>
    <div className='grid scatter'>
    <div className='grid scatter'>
    <MediaViewer src='shader_pattern.gif' description='HLSL Organic Pattern Generation' />
<MediaViewer src='muse_1.mp4' description='Drawing and GLSL' />
<MediaViewer src='ar_jump.mp4' description='Character AR Filter' />
</div>
<div className='flex scatter'>
<MediaViewer src= 'muse_gallery.mp4'  />
<MediaViewer src= 'muse_gorilla.mp4' thumbnail='muse_gorila_short.mp4' description="Web3D interactive Project" />
</div>
    </div>




</>
  )
}

export default Experimental

