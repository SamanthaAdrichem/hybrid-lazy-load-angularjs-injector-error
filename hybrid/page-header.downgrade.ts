import {HybridHelper} from 'hybrid/hybrid-helper.downgrade';
import {PageHeaderComponent} from 'src/app/core/components/page-header/page-header.component';

HybridHelper.downgradeComponent('dcElements', 'elementsPageHeader', PageHeaderComponent, {
	inputs: ['pageTitle', 'pageDescription'],
	outputs: []
});
