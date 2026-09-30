import data from './nigeria-lgas.json';
// Names grouped from Open Admin Data; see public/data-attribution.txt.
export const nigeriaLgas:Record<string,string[]> = data;
export const nigeriaStates=Object.keys(nigeriaLgas).sort();
