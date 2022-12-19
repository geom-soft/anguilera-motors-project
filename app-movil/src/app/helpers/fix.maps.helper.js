export const fixMaps = (map) => {
  
   // FIX GOOGLE MAPS ON MODAL
   map.remove();
   const nodeList = document.querySelectorAll('._gmaps_cdv_');
   for (let k = 0; k < nodeList.length; ++k) {
       nodeList.item(k).classList.remove('_gmaps_cdv_');
   }

};