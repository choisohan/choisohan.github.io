import './css/Style.css'
import Menu from './components/Menu';
import { useEffect, useState } from 'react';
import PageList from './PageList';



function App() {

  const [pIndex, setPIndex] = useState(0);
  const [pages, setPages] = useState(document.querySelectorAll('.page'))
  const [ trigger , setTrigger] = useState();


  useEffect(()=>{
    setPages( document.querySelectorAll('.page') ); 
  },[])

  useEffect(()=>{

    if(pages){

        const bBoxes =Array.from( document.querySelectorAll('.page'))
        .map(p=> p.getBoundingClientRect() )
        .map(b=>({top:Math.floor( b.top), bottom: Math.floor(b.bottom) })); 

      window.addEventListener('wheel',e=>{    
        var found = bBoxes
                      .filter(b => b.bottom <= window.innerHeight + window.scrollY )
                      .filter( b => b.top >= window.scrollY- window.innerHeight+10)[0]

        if(found){
          var foundIndex = bBoxes.indexOf(found);
          setPIndex(foundIndex); 
        }
      })
    }
  },[pages])

  useEffect(()=>{
    if(pages[pIndex] ){
      pages[pIndex].scrollIntoView();
    }
  },[pIndex])


  return (<>
  <div className="App" id='body-root' >
      <Menu texts={PageList.map(p=>p.text)} onMouseEnter={setPIndex} pIndex={pIndex} /> 
      {PageList.map((p, i) =>
          <div className={`page`} key={i}> {p.component} </div>)}
  </div>

  </>

  );
}

export default App;
