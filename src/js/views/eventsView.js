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
    elements.places.style.display = 'grid';
    elements.placesList.innerHTML ='';
    elements.eventsMain.innerHTML =''; 
}


export const renderEvents = (events) =>{
    elements.events.style.display='grid';
    events.forEach(el => {
   
        renderEv(el.title,el.start);
    })
}