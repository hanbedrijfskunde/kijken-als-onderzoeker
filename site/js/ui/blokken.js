// Meldt de oefeningen aan bij het stationsframe.
import { registerBlock } from './station.js';
import { renderCodeer } from './codeer.js';
import { renderKappaHand } from './kappa-hand.js';
import { renderKappaCalc } from './kappa-calc.js';
import { renderOpen } from './open.js';
import { renderKeuze } from './keuze.js';
import { renderSorteer } from './sorteer.js';

registerBlock('codeer', renderCodeer);
registerBlock('kappa-hand', renderKappaHand);
registerBlock('kappa-calc', renderKappaCalc);
registerBlock('open', renderOpen);
registerBlock('keuze', renderKeuze);
registerBlock('sorteer', renderSorteer);
