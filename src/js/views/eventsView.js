import { elements } from './base';

const renderEv = (title, start) =>{
    

    const markup =`
    <div class="singleEvent">
        <div class="singleEvent__title">${title}</div>
        <div class="singleEvent__start">${start.substr(0,10)}
        <span>${start.substr(11,8)}</span>
        
        </div>
    </div>
    `
    elements.eventsMain.insertAdjacentHTML('beforeend', markup);
};

export const eventsClean = () =>{
    elements.placesList.innerHTML ='';
    elements.eventsMain.innerHTML =''; 
}


export const renderEvents = (events) =>{
    events.forEach(el => {
   
        renderEv(el.title,el.start);
    })
}

export const eventsShow =() => {
    elements.events.style.display='grid';
    elements.places.style.display='grid';
}

export const eventsCleanSearch= ()=>{
    elements.places.style.display='none';
    elements.events.style.display='none';

}