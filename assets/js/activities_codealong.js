//Heinz likes to make his functions const instead of writing function
//He also like making the functions "arrow functons" because REACT uses it.

import {myFetch} from '../js/apiUtils.js'


export const Events = async () => {
    const config = await myFetch('../assets/config.json')
    /* console.log(config); */

    const endpoint = "https://iws.itcn.dk/techcollege/schedules?departmentCode=smed"
    //This is called a "destructure assignment". You can pull a value out of a dataObject instead of having to do "events_data.value" for example
    let {value:events_data} = await myFetch(endpoint)
    /* console.log(events_data); */

    /* console.log(data); */

    const endpoint_friendly = "https://api.mediehuset.net/infoboard/subjects"
    const {result:friendly_data} = await myFetch(endpoint_friendly)

    //filtered array, using the config json to choose which show up
    events_data = events_data.filter(elm => config.array_valid_educations.includes(elm.Education))
    /* console.log(events_data); */

    events_data.map(event => {
        //toLocaleTImeString converts the unix timecode into whatever readable text you'd like
        event.Time = new Date(event.StartDate).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })
        /* console.log(event); */

        friendly_data.map(word => {
            if(word.name.toUpperCase() === event.Education.toUpperCase()) {
                event.Education = word.friendly_name
            }
            if(word.name.toUpperCase() === event.Subject.toUpperCase()) {
                event.Subject = word.friendly_name
            }
        })
        /* console.log(event); */
        event.Stamp = new Date(event.StartDate).getTime()
    })
    /* console.log(events_data); */

    
    events_data.sort((a,b) => {
        if(a.StartDate === b.StartDate) {
            return a.Education < b.Education ? -1 : 1
        } else {
            return a.StartDate < b.StartDate ? -1 : 1
        }
    })
    /* console.log(events_data); */
    
    /* if(config.max_num_activities) {
        events_data = events_data.slice(0, config.max_num_activities)
    } */

    let curday_events = []
    let nextday_events = []
    const curdate = new Date()
    const curday_stamp = curdate.getTime()
    const nextday_stamp = curdate.setHours(0,0,0,0) + 86400000

    console.log(new Date(nextday_stamp));

    curday_events.push(...events_data.filter(elm => (elm.Stamp + 3600000) >= curday_stamp && (elm.Stamp < nextday_stamp)))
    nextday_events.push(...events_data.filter(elm => (elm.Stamp) >= nextday_stamp))

    if(nextday_events.length) {
        const nextday_date = new Date(nextday_events[0].StartDate)
        curday_events.push({ Day: nextday_date })
        curday_events.push(...nextday_events)
    }
    
    console.log(curday_events);
    console.log(nextday_events);
    

    let acc_html = `
        <table>
            <tr>
                <th>Kl.</th>
                <th>Uddanelse</th>
                <th>Hold</th>
                <th>Fag</th>
                <th>Lokale</th>
            </tr>
    `
    //make the date on line 95 look nice
    curday_events.map(event => {
        acc_html += event.Day ? `
            <tr>
                <td colspan="5">${event.Day}</td>
            </tr>
        `
        :
        `
        <tr>
            <td>${event.StartDate}</td>
            <td>${event.Education}</td>
            <td>${event.Team}</td>
            <td>${event.Subject}</td>
            <td>${event.Room}</td>
        </tr>
        `
    })
    acc_html += `</table>`

    const container = document.getElementById('codealong_table')
    container.innerHTML = acc_html
}