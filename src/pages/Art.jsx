import React  from 'react'
import MediaViewer from '../components/MediaViewer';

const Art = () => {


  return (
    <>

    {//<img src ='/media/sketch_gorillas.PNG' />
    }

    <div className='grid scatter'>
      <MediaViewer src= 'sketch_gorillas.PNG'  />
      <MediaViewer src= 'paint_fruits.jpg'  />
      <MediaViewer src= 'painting_chimp.jpg'  />
      <MediaViewer src= 'sculpt_gorilla.JPG'  />
      <MediaViewer src= 'sketch_chimp.jpg'  />
    </div>
    </>
  )
}
export default Art;