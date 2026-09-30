export type Product={id:string;name:string;category:string;description:string;price:number;stock:number;image:string;status:string};
export const starters:Product[]=[
{id:'sample-1',name:'The Sculpted Pouch',category:'Bags',description:'A soft, gathered silhouette with a striking finish.',price:48500,stock:0,image:'/products/look-1.jpg',status:'sample'},
{id:'sample-2',name:'The Violet Clutch',category:'Bags',description:'An expressive evening companion.',price:42000,stock:0,image:'/products/look-2.jpg',status:'sample'},
{id:'sample-3',name:'The Ivory Knot',category:'Bags',description:'Soft structure for day to evening.',price:46000,stock:0,image:'/products/look-3.jpg',status:'sample'},
{id:'sample-4',name:'The Pearl Sandal',category:'Heels',description:'A luminous detail on a clean heel.',price:39000,stock:0,image:'/products/look-4.jpg',status:'sample'},
{id:'sample-5',name:'The Silver Step',category:'Heels',description:'A refined strap with a little shine.',price:39500,stock:0,image:'/products/look-5.jpg',status:'sample'},
{id:'sample-6',name:'The Ruby Pouch',category:'Bags',description:'An easy statement in deep red.',price:44500,stock:0,image:'/products/look-6.jpg',status:'sample'},
{id:'sample-7',name:'The White Sandal',category:'Heels',description:'A modern shape for special days.',price:38000,stock:0,image:'/products/look-7.jpg',status:'sample'},
{id:'sample-8',name:'The Lime Mini',category:'Bags',description:'A bright accent for a pared-back look.',price:40000,stock:0,image:'/products/look-8.jpg',status:'sample'}];
export const money=(n:number)=>'₦'+n.toLocaleString('en-NG');
