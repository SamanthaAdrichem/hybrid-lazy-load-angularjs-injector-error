import {HybridHelper} from 'hybrid/hybrid-helper.downgrade';
import {CacheService} from 'src/app/core/data/cache/cache.service';

HybridHelper.downgradeProvider('dcApp', 'CacheService', CacheService);
