import './css/Style.scss'
import { useHistory, useUpdateHistory  } from './Contexts/ConversationContext';
import { useState, useEffect , useRef } from 'react';
import Popup from './components/Popup';
import { useUpdatePopupContent } from './Contexts/PopupContext';


const App =  ()=> {

    const history = useHistory();
    const addHistory = useUpdateHistory(); 
    const [twineJson,setTwineJson] = useState();
    const twineJsonRef = useRef();
    const updatePopup = useUpdatePopupContent();


    const LineComponent = ( text,links )=>{
      const pattern =  /(\[\[.*?]])/g;

      var sections =  text.split(pattern).filter(j=>j).map( (section) =>{
        
          var match;
          links.forEach( link =>{
            var linkMatch = section.match(new RegExp(`\\[\\[([^\\]]*${link.name}[^\\]]*)\\]\\]`));
            if(linkMatch){match = link;}
          })

          if(match){
            return <button pid={match.pid ? match.pid: null } key={section} label={match.link}
                dangerouslySetInnerHTML={{__html:match.name}}
                onClick={()=>{
                  if(match.pid && match.pid in twineJsonRef.current.passages){
                      addHistory(match.pid);
                  }
                }}/>
          }else{
            return <span key={section} dangerouslySetInnerHTML={{__html:section}}/>
          }
      });

      return [...sections, <p />]
    }  
  
    const SortTwine= (twineJson)=>{
        var pArr = twineJson.passages; 
        var obj = {};
        pArr.forEach(passage => {
            var lines = passage.text.split('\n')
            var links = passage.links || [] ;
            lines.forEach( (line, i) =>{
                lines[i] = LineComponent(line,links,0) 
            })
            obj[passage.pid] =lines;
        });

        var pathes = pArr.filter(p=>p.name.includes('*')).map(p=>( { name: p.name.replace('*','...'), pid: p.pid } ))
        return { passages: obj , pathes:  pathes };
    }

    useEffect(()=>{
      var lastPassage = document.querySelectorAll('.passage')
      if(lastPassage.length > 0 ){
        lastPassage = lastPassage[lastPassage.length-1]; 
        lastPassage.scrollIntoView();
      }
    },[history])

    useEffect(()=>{
      window.addEventListener('mousedown',e=>{
        if(e.target.nodeName == 'IMG' && e.target.parentNode.nodeName != 'BUTTON' ){
          updatePopup(<img src={e.target.src} />);
        }
      })
    },[])


    useEffect(()=>{
      fetch('/json/Hello.json')
          .then( async res=> await res.json() )
          .then( json =>{
            var sorted = SortTwine(json)
              setTwineJson(sorted) ;
              twineJsonRef.current = sorted
                var _history = localStorage.getItem('history');
                _history = _history ?  JSON.parse(_history) : []; 
                var url = window.location.pathname.replace('/','');
                if(url.length<1){_history.push('1')}
                else{_history.push(url)}
                console.log({init: _history })
                addHistory(_history )

          }) 
    },[])

if(twineJson){
  return <>
  <div id='passages'>
  {history.map((pid, pidx) =>
{
if(pidx < history.length -1 ){

return <div key={pidx} className='passage'>{
  
  twineJson.passages[pid].map( sections => 
    sections.map( span =>{
      if( span.props.pid ){ //&& span.props.pid !=history[pidx+1] ){
        return null; 
      }else{
        return span ;
      }
    })
  )

}</div>
}else{
//last
return <div key={pidx} className='passage'>
   <button id='prev-button' onClick={()=>{addHistory(-1)}}>Back</button><p />
  {twineJson.passages[pid]}
    </div>
  }
})}
</div>


<div className='footer'>

    <button onClick={()=>{
        localStorage.removeItem('history');
        window.location.pathname='/'
      }}>Clear History</button>

    <button id='sitemap-button' onClick={e=>{
      var tg = e.target.parentNode.querySelector('#sitemap')
      if(!tg.className.includes('show')){
        tg.className = 'show'
      }else{
        tg.className = '' 
      }
    }}>Site Map</button>

    <span id='sitemap' className=''>
      { twineJson.pathes.map(path=>
          <button onClick={()=>{addHistory(path.pid);}}>
            {path.name}</button>) }
    </span>
    

</div>

<Popup />
  </>
}

}


export default App;