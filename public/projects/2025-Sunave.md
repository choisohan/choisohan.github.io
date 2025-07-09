---
title: 'Sunave'
start: '2025-01-11'
thumbnail: '/media/2025_sunave/7-1-low15.mp4'
tags: '3D,threeJS,webdev,webGL,real-time,reactjs'
---

<video className='full' muted autoplay loop><source src='/media/2025_sunave/7-1-low15.mp4'></video>



What if I could live in a beautiful town with all my favorite people as neighbors?
Would’ve been nice if someone told me earlier that dream’s basically impossible.
(Seriously, have you seen the property market? It’s wild.)

[🏠Sunset Avenue](https://sunave.netlify.app/) is my way of holding onto that vibrant childhood dream.
Each house syncs with an online calendar — so you can see how vibrant everyone’s life is, no matter where they are.

In this post, I’ll quickly walk through how I built it.
No heavy tech talk — just a simple, fun read.

Let’s get started.



## 1. Structure Summary

- **Framework(Library)** : React
- **3D scene** : Three.js via React Three Fiber
- **Calendar Data Fetching** : ical format with ical.js
- **Backend Hosting** : Glitch.io


To start a JavaScript project, you need a **code editor** like VS Code.
Then, install **Node.js** to use the `npm` command for installing libraries.
Optionally, **Git** helps track code changes over time.

> In coding, a library is like a set of pre-made ingredients you can use in your project.
> As a developer, you can choose the right libraries and mix them as you want.

``` command
npm install react.js three.js react-three-fiber ical.js
```

React renders 2D website elements like layouts and buttons.
Three.js renders 3D graphics in the browser.
React Three Fiber integrates Three.js smoothly into React.
ical.js parses iCal calendar data into easy-to-use JSON.




## 2. Go Fetch!

When I start a new project, the first thing I tackle is what I know the least.
If any part turns out to be impossible, the whole effort feels pointless.
For this project, that tricky part was fetching the calendar data.

When you develop something, there are two sides: frontend and backend.
**The frontend** is what you and other users see and interact with.
**The backend** is the hidden hand managing data across different servers.

Fetching calendar data from online requires some backend work.
For this, I used **Glitch** to host a free backend server.
I created a new project on Glitch and added the following code to the bottom of `server.js`:

```js
fastify.post('/fetch-ical', async (req, reply) => {
  try {
    const res = await fetch(req.body.url);
    const icalData = await res.text();  // iCal data as plain text
    return reply.send({ icalData });    // Send it back as JSON
  } catch (error) {
    // handle error here
  }
});
```

What’s happening here:

1. The Glitch server accesses the URL sent in `req.body.url`
2. It fetches some iCal data from that address
3. It wraps the data in JSON and sends it back to the frontend

Of course, this only runs when a request is made.
Here’s what the frontend can send to trigger it:

![google calendar offers ical url](/media/2025_sunave/gcal.png)

```js
const requestData = { url: icalUrl };

fetch(myGlitchURL + '/fetch-ical', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(requestData)
})
.then(res => res.json())
.then(async data => {
  // Yay, data arrived!
});
```


One of the biggest downsides of using iCal is that you can’t request **just a little bit of data** — you have to fetch the whole thing.
It’s kind of like shopping at Costco as a bachelor: you don’t really need that much of everything, but that’s the only size available.

If I had used something like the **Google Calendar API**, this could’ve been solved.
I’d be able to fetch only the data I need, and even set up webhooks to trigger when events are created or deleted — meaning the frontend could stay updated in real time.

But unfortunately, I was running out of time. So I went with the bulk option.
Big bag of data it is.

> **🤷‍♀️Why Calendar?**
> There used to be a **routine builder** in an older version of this project (a couple of years ago).
> Each house acted like a routine you’d set: open the curtains, close the curtains — that kind of thing.
> I ended up scrapping the whole feature after spending way too long on it… because the more I built it, the more it just turned into a regular calendar.
> 😂 You live and learn.



## 2. Paint Sunset
<video muted autoplay loop className='full'><source src='/media/2025_sunave/1-1-low.mp4'></video>


I wasn’t really a sunset person. I never quite understood why people would suddenly stand up and stare at the sky like something magical was happening.
But one day, I was just sitting on the grass near my home, and out of nowhere, I felt this strange, unexplainable bond with a bunch of strangers — just from watching the same sunset together.

And in that moment, I wished I could share that same feeling with people I actually care about, even if they’re on the other side of the world.
(But I knew I couldn’t. And that made me a little sad.)

The name of this project came from that moment.

The sunset is a key part of this project — I had to get it right.
I wanted the sky to look a little different every day, so I built it using a procedural method.


<video muted autoplay loop><source src='/media/2025_sunave/sky.mp4'></video>


First, I created some random shapes in Photoshop and turned them into tangent normals.
Then, I **distorted** the cloud image using Perlin noise to give it some organic motion.
After that, the image gets **repainted** with new colors.

For this recoloring process, I used another map as a sampler:

<img src='/media/2025_sunave/skyColors.png' class='small'>

```glsl
    vec3 cloudShadow = texture2D( uSkyColorMap, vec2( 3.0/5. +.1, fract(uTime) ) ).xyz;
    vec3 cloudHighlight = texture2D( uSkyColorMap, vec2( 4.0/5. +.1, fract(uTime) ) ).xyz;
    vec3 cloudColored = mix(cloudShadow, cloudHighlight, cloudsMixed.x );
```

This is how I sample the color using UV coordinates.
These sampled colors are then used in various shaders across the scene — on houses, trees, the ocean… basically anything that needs to feel like it’s part of the same sky.






## 3. House Designer
<video muted autoplay loop><source src='/media/2025_sunave/11-1-low.mp4'></video>

I imagined endless possibilities for designing the houses — all kinds of shapes, styles, and details.
But the truth is, the more options you offer, the more pressure the user feels.
So I decided to keep it simple: **one house geometry, a few color choices.**

Keeping each house as a single mesh also reduces render calls, which helps with performance.
Sometimes less really is more — both for the user and the GPU.

![](/media/2025_sunave/houses.png)




## 4. Grid System
<video muted autoplay loop className='full'><source src='/media/2025_sunave/10-1-low.mp4'></video>

The grid shown in the town editor mode is baked directly into the 3D file as a renderable mesh.
That’s because the town is hilly — it needs its own custom grid geometry that follows the surface properly.

![](/media/2025_sunave/town_maya.png)


When the FBX file is loaded, it stores the transform data (position and rotation) of each grid cell in an array:


```js
const gridTransforms = [];

_fbxFile.traverse(_child => {
  if (_child.parent.name === "grid") {
    const pos = new Vector3();
    _child.getWorldPosition(pos);

    const rot = new Euler();
    const quat = new Quaternion();
    _child.getWorldQuaternion(quat);
    rot.setFromQuaternion(quat, "XYZ");

    const cellTransform = { position: pos, rotation: rot };
    gridTransforms.push(cellTransform);
  }
});

```

Then, when rendering a house, the system looks up the right transform from that array:

```js
<House property={{ cellNumb: 12 }} />
// This finds the corresponding transform from the grid array
```


## 5. Custom Pixelation Effect

I didn’t originally plan to render this in a pixel art style.
But I’ve always liked the old-school, low-key vibe of pixel art — and it felt like a natural fit for the mood of Sunset Avenue.
There’s something about it that gives more weight and solidity to the scene than smooth 3D rendering does — kind of like turning a watercolor into thick acrylic paint.

For post-processing effects, I used the [postprocessing](https://www.npmjs.com/package/postprocessing) library — a common choice in Three.js projects.
It’s great for things like color adjustment and bloom.
It even has a built-in pixelation effect, but the result wasn’t quite what I wanted.

Take a look at the right side of the comparison below — you’ll notice some strange tiling in the sky gradient.
That’s called [color banding](https://upload.wikimedia.org/wikipedia/commons/9/9a/Colour_banding_example01.png), and it’s a common issue when compressing images (like tiny GIFs) or using low-res color sampling.
![](/media/2025_sunave/pixelationCompare.png)

The default pixelation effect samples every block evenly, regardless of how small the color difference is — which makes gradients look chunky and artificial.
Unfortunately, I couldn’t tweak it enough to fix that.

But then I stumbled upon [this article](https://blenderartists.org/t/can-i-somehow-set-up-a-sharp-low-resolution/1323775/5), which helped me get the exact look I was after:


```glsl
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Calculate pixel grid size based on pixelSize and resolution
  vec2 dxy = pixelSize / resolution;
  float offset = 1.5 / pixelSize;
  vec2 pixelUv = vec2(
    (floor(uv.x / dxy.x) + offset) * dxy.x,
    (floor(uv.y / dxy.y) + offset) * dxy.y
  );
  vec4 color = texture2D(tDiffuse, pixelUv);
}
```

The key here is `float offset = 1.5/pixelSize;`
That offset shifts the sample point away from the block edge and closer to the center — helping reduce color banding in gradients.
If the offset is too small, you’ll sample near edges, causing artifacts.
If it’s too large, you’ll drift too far into the block, possibly distorting the grid and stretching colors slightly.

1.5 turns out to be a sweet spot — smooth gradients, preserved pixelation, and no weird tiling.

PS. Thank you,Matías Fernández and power of internet community :D


## 6. Sort Events

When event data arrives, each one needs to be duplicated based on its repetition rule.
These rules follow the RRULE format — things like daily, weekly, or from a certain date to another.

Example:
`FREQ=WEEKLY;BYDAY=TU;UNTIL=20251230`


To decode that into something usable, I used the rrule JavaScript library:


```js
import { RRule } from "rrule";

const evtRRule = `FREQ=WEEKLY;BYDAY=TU;UNTIL=20251230`;

const options = RRule.fromString(evtRRule).options;
const rule = new RRule(options);

const DateFromNow = (days) => new Date().setDate(new Date().getDate() + days);
const recentOccurrences = rule.between(DateFromNow(-10), DateFromNow(+10), true);

```
It’s important to limit the range using `between()` —
if the rule creates infinite events, you don’t want to generate thousands at once.
Your app (and your sanity) will thank you.

Once you’ve expanded all the events, sort them by their start time:


```js
evts = evts.sort((a, b) => a.startMoment.diff(b.startMoment));
```

> **🤪Fun Neighbours**
> To fill up the town, I needed more houses — and more calendars.
> So I copied iCal data from my own Google Calendar, saved it as a .json file in the project folder, and started to get creative.
> ``` js
> fetch("/calendars/bs.json")  
> // Fetching directly from the public folder, no backend needed
> ```
> One of the "residents" is めんこいラーメン, a ramen shop that occasionally gets caught up in awkward situations involving the owner’s ex-wife.
Local drama… now in your browser.


## 7. Control Time 
One variable that needs to be shared across multiple components is `time`.
It drives everything — from how shaders animate to determining which calendar event is currently active for each house.

I created the time variable as a **React context**, which acts as a global variable within the app.

```js
const TimestampContext = React.createContext();
const UpdateTimestampContext = React.createContext();

export function EnvProvider({ children }) {
  const [timestamp, setTimestamp] = useState(new Date().valueOf());

  return (
    <UpdateTimestampContext.Provider value={setTimestamp}>
      <TimestampContext.Provider value={timestamp}>
        {children}
      </TimestampContext.Provider>
    </UpdateTimestampContext.Provider>
  );
}
```

The timestamp is updated every minute using an interval:


```js
useEffect(() => {
  const interval = setInterval(() => {
    updateTimestamp(new Date().getTime());
  }, 60000); // update every one minute

  return () => clearInterval(interval);
}, [updateTimestamp]);
```

Now, whenever the timestamp updates, a few things get triggered:


```js
const House = () => {
  const timestamp = useTimestamp();

  useEffect(() => {
    // 1. Update all material shaders' uTime
    materials.forEach(mat => {
      mat.uniforms.uTime.value = timestamp;
    });

    // 2. Get the current calendar event based on time
    const pastEvents = events.filter(evt =>
      evt.endMoment.isBefore(new moment(timestamp))
    );

    setCurrentEvent(events[pastEvents.length]);
  }, [timestamp]);

  // ...
}

```



## 9. Lastly

This project isn’t perfect yet, but I’m happy to share the progress I’ve made so far.
If you have any questions while reading through this, feel free to reach out — I’d be glad to chat.

There are still tons of features I’d love to add:
more animation on the houses and streets, interesting events, maybe even connecting it with social media.

If any of this sounds fun to you and you'd like to be involved, don’t hesitate to get in touch. 😄
