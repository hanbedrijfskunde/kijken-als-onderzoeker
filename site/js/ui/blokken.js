// Meldt de oefeningen aan bij het stationsframe.
import { registerBlock } from './station.js';
import { renderCodeer } from './codeer.js';
import { renderKappaHand } from './kappa-hand.js';

registerBlock('codeer', renderCodeer);
registerBlock('kappa-hand', renderKappaHand);
