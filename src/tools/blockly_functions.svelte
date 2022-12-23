<script context="module" lang="ts">
    import { globalplugin } from '../store/stores';

    let plugin;
const unsubscribe = globalplugin.subscribe((value) => plugin = value)

export async function logDailyTrackerValue(value,tracker ,day){
    let result = false;
    let lognote = tracker+"("+value+")";
    const timezonecorrection = (new Date().getTimezoneOffset())*-1;
    try {
      let log = {
        note: lognote,
        end: new Date(day),
      };
      // Set Date
      if (day == "today"){
        day = new Date()
        day = new Date(day.getTime() + timezonecorrection * 60000);
        day = day.toISOString().slice(0, 10);
      }
      else if (day == "yesterday"){
        day = new Date()
        day.setDate(day.getDate() - 1);
        day = new Date(day.getTime() + timezonecorrection * 60000);
        day = day.toISOString().slice(0, 10);
        
      }
      let logdate = day+"T13:00:00";
      let start = new Date(logdate);
      // Log
      plugin.createNote({
	        note: log.note,
	        end: log.end
        });
     
      result = true;
      
    } catch (e) {
      result = false;
    }
return result;
}

export async function getPeriodTrackerValue(trackable,period,statistic){
    var timerange = "0";
    if (period == "TODAY"){
      timerange = "1"
    }
    else if (period == "LAST7DAYS"){
      timerange = "7"
    }
    else if (period == "LAST30DAYS"){
      timerange = "30"
    }
    else if (period == "LAST60DAYS"){
      timerange = "60"
    }
    else if (period == "LAST90DAYS"){
      timerange = "90"
    }
    else {timerange = "7"}
    
    let result = 0;
    if (trackable.charAt(0) == "#" || trackable.charAt(0) == "@" ) {
    const call = await plugin.getTrackableUsage({ tag:trackable, daysBack: parseInt(timerange)});
    const usage = call.usage;
    let total = 0;
    let count = 0;
    let min = 0;
    let max = 0;
    for (let value of usage.values) {
    total = total+value;
    count = count+1;
        if (count == 1) {
          min = value;
        }
        if (value > max) {
          max = value
        }
        if (value < min) {
          min = value
        }
    }
    if (statistic == "sum"){
      result = total
    }
    else if (statistic == "avg"){
      result = total/usage.values.length;
    }
    else if (statistic == "Max"){
      result = max;
    }
    else if (statistic == "Min"){
      result = min;
    }
    else {result = 0}
  }
  else {
    let searchstring = trackable;
    const notes = await plugin.searchNotes(searchstring, new Date(), parseInt(timerange) );
    if (notes) {
    let total = notes.length;
    if (statistic == "sum"){
      result = total
    }
    else if (statistic == "avg") {result = total/parseInt(timerange)}
    else {result = 0};
  }
  else {result = 0}
  }
return result;

 }

export async function getDailyTrackerValue(tracker,date,stats) {

  tracker=tracker.replace(/[()]/g, '');
  date=date.replace(/[()]/g, '');
  stats=stats.replace(/[()]/g, '');
  //DEFINE DATE TO WORK WITH
  if (date == "today"){
    date = new Date().toISOString().slice(0, 10);
  }
  else if (date == "yesterday"){
    let tmpdate = new Date()
    tmpdate.setDate(tmpdate.getDate() - 1);
    date = tmpdate.toISOString().slice(0, 10);
  }
  
  //let startdate = date+"T00:00:00";
  let start = new Date(date);
  start.setDate(start.getDate() + 1); // adjust 1 day for the searchNotes Query

  const notes = await plugin.searchNotes(tracker, start, 1);
  let total = 0;
  let count = 0;
  let min = 0;
  let max = 0;
if(notes) {
	notes.forEach(entry=>{
    entry.elements.forEach(element=>{
      if ( element.prefix+element.id == tracker) {
        total = total + element.value;
        count = count+1;
        if (count == 1) {
          min = element.value;
        }
        if (element.value > max) {
          max = element.value
        }
        if (element.value < min) {
          min = element.value
        }
      }
    })
	})
}
let result = 0;
if (stats == "sum") {
  result = total;
}
if (stats == "avg") {
  result = total/count;
}
if (stats == "Min") {
  result = min;
}
if (stats == "Max") {
  result = max;
}
return result;
 } 



</script>