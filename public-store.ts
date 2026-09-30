import {db} from './server';
import {getDeliveryConfig} from './delivery-config';
import {getPaystackSecret} from './paystack-config';
import {defaultStoreSettings, type StoreSettings} from './store-settings';
import type {Product} from './catalog';

// Read only public CMS fields. Credentials and staff data never enter page props.
export async function getPublicStore(){
  const [products,rows,delivery] = await Promise.all([
    db().prepare("SELECT id,name,category,description,price,stock,image,status FROM products WHERE status='active' ORDER BY created_at DESC").all<Product>(),
    db().prepare("SELECT key,value FROM settings WHERE key IN ('brand','heroTitle','heroText','promotion','heroImage')").all<{key:string;value:string}>(),
    getDeliveryConfig()
  ]);
  const settings:StoreSettings={...defaultStoreSettings};
  for(const row of rows.results){
    const key=row.key as 'brand'|'heroTitle'|'heroText'|'promotion'|'heroImage';
    settings[key]=key==='brand'?row.value.replace(/\s+atelier\b/gi,'').trim():row.value;
  }
  // A payment configuration problem must not replace the saved homepage.
  settings.paymentsReady=await getPaystackSecret().then(Boolean).catch(()=>false);
  return {products:products.results,settings,deliveryZones:delivery.zones.filter(z=>z.active)};
}
