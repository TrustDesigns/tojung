export type DeliveryZone={id:string;state:string;area:string;lgas:string[];fee:number;active:boolean};
import {nigeriaLgas,nigeriaStates} from './nigeria-locations';
export {nigeriaStates,nigeriaLgas} from './nigeria-locations';
export function validateDeliveryZones(value:unknown):DeliveryZone[]{
 if(!Array.isArray(value)||value.length>1000)throw Error('Use up to 1,000 delivery areas.');
 const ids=new Set<string>(),names=new Set<string>();
 return value.map(z=>{if(!z||typeof z!=='object')throw Error('Invalid delivery area.');const {id,state,area,fee,active}=z;const lgas=z.lgas===undefined?[]:z.lgas;
 if(typeof id!=='string'||!/^[-a-zA-Z0-9]{1,80}$/.test(id)||ids.has(id))throw Error('Invalid or repeated delivery area.');
 if(typeof state!=='string'||!nigeriaStates.includes(state)||typeof area!=='string'||!area.trim()||area.trim().length>100)throw Error('Choose a state and enter an area name.');
 if(typeof fee!=='number'||!Number.isSafeInteger(fee)||fee<0||fee>1000000||typeof active!=='boolean')throw Error('Enter a delivery fee from ₦0 to ₦1,000,000 in whole naira.');
 if(!Array.isArray(lgas)||lgas.some(lga=>typeof lga!=='string'||!nigeriaLgas[state].includes(lga))||new Set(lgas).size!==lgas.length)throw Error('Choose valid local government areas for this state.');
 const enabled=active&&lgas.length>0;
 const name=state+'|'+area.trim().toLowerCase();if(names.has(name))throw Error('This state and area already exist.');ids.add(id);names.add(name);return {id,state,area:area.trim(),lgas,fee,active:enabled};});
}
export function matchingDeliveryZones(zones:DeliveryZone[],state:string,lga:string){return zones.filter(z=>z.active&&z.state===state&&z.lgas.includes(lga));}
export function deliveryFor(zones:DeliveryZone[],id:unknown,state:unknown,lga:unknown){
 if(typeof state!=='string'||typeof lga!=='string'||!nigeriaLgas[state]?.includes(lga))throw Error('Please select a valid delivery state and local government area.');
 const zone=matchingDeliveryZones(zones,state,lga).find(z=>z.id===id);if(!zone)throw Error('Delivery is not available for the selected state, local government area and area.');return zone;
}
export function orderTotal(subtotal:number,discount:number,fee:number){return subtotal-Math.min(subtotal,Math.max(0,discount))+fee;}
