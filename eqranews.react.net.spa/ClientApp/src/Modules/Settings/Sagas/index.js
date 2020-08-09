import CountrySagas from './Country';
import CategorySagas from './Category';
import CrawlStepTypeSagas from './CrawlStepType';

export default [...CountrySagas, ...CategorySagas, ...CrawlStepTypeSagas];
