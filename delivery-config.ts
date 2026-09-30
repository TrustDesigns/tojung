import {db} from './server';
import {validateDeliveryZones} from './delivery';
export async function getDeliveryConfig(){const row=await db().prepare("SELECT value FROM settings WHERE key='deliveryZones'").first<{value:string}>();if(!row)return {zones:[],revision:'',raw:null};const saved=JSON.parse(row.value);return {zones:validateDeliveryZones(saved.zones),revision:String(saved.revision),raw:row.value};}
