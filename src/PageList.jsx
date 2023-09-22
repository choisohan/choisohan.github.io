import Art from './pages/Art';
import Dev from './pages/Dev';
import Professional from './pages/Professional';
import Experimental from './pages/Experimental';
import TheLast from './pages/TheLast';
import Writing from './pages/Writing';

const PageList = [
    {
        text : "I am an artist" ,
        component : <Art />
    },
    {
        text : "and a developer" ,
        component : <Dev />
    },
    {
        text : "who can do these" ,
        component : <Professional />
    },
    {
        text : "& continue experiment." ,
        component : <Experimental />
    },
    {
        text : "Currently," ,
        component : <TheLast />
    },
]


export default PageList; 