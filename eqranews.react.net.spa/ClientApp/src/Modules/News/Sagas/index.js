import newsSagas from './news';
import newsItemSagas from './newsItem';

export default [...newsSagas, ...newsItemSagas];
