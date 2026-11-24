// Meldt de oefeningen aan bij het stationsframe.
import { registerBlock } from './station.js';
import { renderCodeer } from './codeer.js';
import { renderKappaHand } from './kappa-hand.js';
import { renderKappaCalc } from './kappa-calc.js';
import { renderOpen } from './open.js';

registerBlock('codeer', renderCodeer);
registerBlock('kappa-hand', renderKappaHand);
registerBlock('kappa-calc', renderKappaCalc);
registerBlock('open', renderOpen);
