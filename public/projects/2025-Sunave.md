---
title: 'Sunave'
start: '2025-01-11'
thumbnail: '/media/2025_sunave/7-1-low15.mp4'
tags: 'developer,webGL,real-time,reactjs,modeling,3D'
---

<video className='full' muted autoplay loop><source src='/media/2025_sunave/7-1-low15.mp4'></video>


What if I can live in the beautiful town with full of my favorite people as neighbour?
It would be actually heplful if somebody wise tells me earlier that this dream just can't be true.(Look at the property market!)
Realistically... everybody has different life plan.
Somebody move out, somebody move back, get different life style.
Some people moves out of my daily life but it doesnt mean that I forget them. I sometimes still think about them and curious about them.
One day, looking at the sunset, I never a fan of sunset but I became unsually moody and think what if i can share this sunset?
This is freakishly unlike me. This Sunset Avenue project name came from this moment. no idea when it was exactly.
probably when i was much younger and fresh...

In this time, I will briedlfy introduce how this[🏠Sunset Avenue](https://sunave.netlify.app/) project has been made. 
This would be easy to read since it won't be that too technical nor professional.

Okay. Let's start.


## 1. Structure Summary

- Framework(Library) : React
- 3D scene : Three.js via React Three Fiber
- Calendar Data Fetching : ical format with ical.js
- Backend Hosting : Glitch.io


To begin javascript project, you need code editor such as VS code.
secondly Node.js to allow you to use `npm` command to install the useful js library.
and optional, install git to manage the revision of the codes over time.

When we say the library in coding, it's pre-maid ingrients you can use for your cook.
As a developer, I am going to get the right libary and mix as I want.

``` command
npm install react.js three.js react-three-fiber ical.js
```

React.js is something for rendering ordinary 2D website element like layout and buttons etc.
Three.js is to render 3D elements in the browser. In this case, I am using React, I am using React-three-fiber that built as integratable in React.
Ical.js is a libary to sort the calendar json data as simpliest as possible.



## 2. Go Fetch!

When I start a new project, First I tackle is what I know the least.
If I find any of the parts is possible, the whole effort become meaningless.
And for this project, it is how to fetch the calendar data.

When you develop something, there is two side. One is frontend and another is backend.
Frontend is what you and others(client) see and interact with.
Backend is hidden hands sending and managing the datas.

Because my tasks on this project is fetching the calendar data from google calendar, i need hidden hands.
This hidden hands requires its own server. In this case, I used glitch to host my free server.
I created the new project on glitch, and add these code to bottom of the server.js

```js
fastify.post('/fetch-ical', async (request, reply) => {
  try {
    const response = await fetch(request.body.url);
    const icalData = await response.text();  // iCal data as text
    return reply.send({ icalData });  // Send the iCal data as JSON
  } catch (error) {
    fastify.log.error('Error fetching iCal data:', error);
    return reply.status(500).send({ error: 'Failed to fetch iCal data' });
  }
});
```

Now when you go back to the client side javascript, you can call the fetch like below.
I will share what i do with this fetched data in the other section.

```js
fetch( myGlitchURL +'/fetch-ical',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  
        },
        body:JSON.stringify( { url: icalUrl } )
    })  
    .then(response => response.json())  
    .then(async data => {
        // do anything 
    })
```


One of the biggest con of using ical is there are no other option than getting the whole big data.
Like shopping at the costco as a bachelor, You don't really need that much of everything.

If i use something like google API, this will be resolved. Getting less data per time.
Also it will have a hook that triggers when any new events is created or deleted so the frontend will updated in real time. 
But unfortuately, I had a running of my time, I choose the quickest way. Bulk buying.


#### 🤷‍♀️Why Calendar?
There used to be a routine builder on the previous version of this project. ( a couple years ago )
house acts as routine the user set up. Open the curtain. close the curtain. likda thing
I aborted this whoel feature after I spend ages to build it, because the more I build it, it turns out just regular calendar. haha. you live and learn.



## 2. Paint Sunset
<video muted autoplay loop><source src='/media/2025_sunave/1-1-low.mp4'></video>

Since its name is "sunset avenue", creating the right sunset is the most important part.


This sky is created procedurally. I twisted the images and deformed the color on the surface. this kind of work is shader development.
Since three.js is WebGL based, the shader I had to work on was .GLSL (OpenGL Shader Language)


![](/media/2025_sunave/skyShader.gif)

First, I painted random shape in photoshop and made them as tangent normal. 

the shader distorts the cloud map with perlin noise and sky height ramp float.
and then float value is remapped with rgb color by the uv coordinate.

![](/media/2025_sunave/skyColors.png)

setting raw RGB Value in code seems like unrealistic and hard to art directing, I created this texture map.
vertically the time changes, horizontally the variation of color is there.

```glsl
    vec3 cloudShadow = texture2D( uSkyColorMap, vec2( 3.0/5. +.1, fract(uTime) ) ).xyz;
    vec3 cloudHighlight = texture2D( uSkyColorMap, vec2( 4.0/5. +.1, fract(uTime) ) ).xyz;
    vec3 cloudColored = mix(cloudShadow, cloudHighlight, cloudsMixed.x );
```



## 3. Control Time 
All the shaders here get affected by the same float variation in the browser.
It's time. it decide which direction sun is and what is the sky color.

Since this variable is required to get through the different component and also needs to be updated by other button component, I created the varation as context.


```js
const TimestampContext = React.createContext();
const UpdateTimestampContext = React.createContext();

export function EnvProvider({children}){
    const [ timestamp,setTimeStamp] = useState( new Date().valueOf() );

    return <SetTimePlayModeContext.Provider value={setPlayMode}>
            <TimePlayModeContext.Provider value={playmode}>
            {children}
            </TimePlayModeContext.Provider>                
    </SetTimePlayModeContext.Provider>
}
```

After creating my custom context provider, I wrap my whole app with this.
```js
function App() {
  return (
      <EnvProvider>
        <SunAve />
      </EnvProvider>
  );
}
```

timestamp needs to be updated.
```js
    useEffect(() => {
      const interval = setInterval(() => {
          updateTimestamp( new Date().getTime() );
      }, 60000);
      return () => clearInterval(interval);
    }, [updateTimestamp]);
```


And added lines to all the shaders to let them update its variable whenever timestamp is updated.
```js
  useEffector(()=>{
    material.uniforms.uTime.value = timestamp;
  },[timestamp])
```

#### About Timezone
To sort the timezone and render the timestamp in the readable way, i used moment-tz library.
`$npm install moment-tz`

```js
const thisMoment = moment(timestamp).tz("America/Vancouver");
const prettyString = thisMoment.format('MMM D ddd, hh:mm A');// May 2 Fri, 09:15 AM
```
 


## 4. House Designer
<video muted autoplay loop><source src='/media/2025_sunave/11-1-low.mp4'></video>

I struggled how much flexible the user should get to create their own house.
At first, I was thinking about all section is seperated and let the user choose to build it.
This sounds great but it will create the higher render call. (More mesh = More things to render = Slower)
I had to keep the one house is one render call. it has to be one mesh.
I decided to let users switch the different texture over the variation of fully built mesh.

![](/media/2025_sunave/houses.png)

I created the multiple meshes and assign the same materials over the same section.
- roof, wallA, wallB, windowsA, windowsB, door...


The house design is created based on the property it's given.
```js
<House property ={{ mesh:"1", door:"A1", wall1:"F4W" , wall2:"W30" , roof:"CU"}} />
<House property ={{ mesh:"2", door:"A2", wall1:"F2W" , wall2:"W10" , roof:"DU"}} />
```



## 6. Grid System
![](/media/2025_sunave/town_maya.png)

The town has an organic shape. the house placement would be also organically follow the shape.
It means it not only needs its location, but also needs its orientation.
I quickly realized I need to create the each geometry in the same scene.

<video muted autoplay loop><source src='/media/2025_sunave/10-1-low.mp4'></video>



## 7. Custom Pixelation Effect

While threejs already has pixelation effect, but it wasn't as i wanted.
Luckily i reached to [this article](https://blenderartists.org/t/can-i-somehow-set-up-a-sharp-low-resolution/1323775/5) and could achieve the look as i wanted.


```glsl
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Calculate pixel grid size based on the pixel size and resolution
  vec2 dxy = pixelSize / resolution;
  float offset = 1.5 / pixelSize;
  vec2 pixelUv = vec2( (floor(uv.x / dxy.x) + offset) * dxy.x,(floor(uv.y / dxy.y) + offset) * dxy.y);
  vec4 color = texture2D( tDiffuse , pixelUv );
}
```
![](/media/2025_sunave/pixelationCompare.png)


## 8. Sort Events

This is how it is when I get the calendar data.
calendar: name , description...
events : [
  {name : "Lunch Time", start: Time, RRule: "DAILY" },
  {name : "Sleep", start: Time, RRule: "DAILY" },...
]


This is great but not exactly what I want. What I want is this.
[{},{},{},{},{}]


To duplicate the same events as an array, you should look into rrule. rrule is short for Recurrence Rule.

```ini
FREQ=WEEKLY;BYDAY=TU;UNTIL=20251230
```

rrule is stored as string so to covert to the right object format, i use RRULE.js library.


```js
import { RRule } from "rrule";

var options =  RRule.fromString( event.rrule ).options;
const rule = new RRule(options); 
```

Now, i can array of repetitive events between two dates.

```js
const DateFromNow = (days)=>{
    return new Date().setDate( new Date().getDate() + days );
}
const recentOccurrences = rule.between( DateFromNow(-10), DateFromNow(+10) , true); // todo: this matters. 
```

all the events on the calendar should go through this function as a loop. it needs to be sorted by starting time.

```js
evts = evts.sort((a, b) =>  a.startMoment.diff(b.startMoment));
```





#### 👯Fun Neighbours
To fill the town, there must be more houses. 
I copied ical data from my google calendar and saved it as .json file on the project folder.
and started to be creative.

```js
fetch(`/calendars/bs.json`); // instead of fetching from backend, i can fetch from my frontend file in public folder.
```

For example,

```js
{
    "name": "めんこいラーメン",
    "description": "Menkoi Ramen. Owner : Takeshi Tanaka, Age: 45, Friendly, charismatic, easy to talk to.",
    "timezone":  "Asia/Tokyo",
    "events":[
      //....
]}
```

this popular japanese ramen place has a drama every once in a while becasue the ex-wife of the owner visit the place with her current boyfriend. lol.

I love drama.  what can i do.




## 9. Ending

This is not perfect yet but I'm happy to share the progress on this.
If any of you wants to learn more, reach out to me. I am happy to answer that.
This project is shared as public repository. You can clone it if you want to play with it.
I'm very happy to coolaborate with others if any of you are interested in. art or dev, small or big. Cheers.


