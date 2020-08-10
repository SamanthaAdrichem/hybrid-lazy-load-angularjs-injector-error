import jQuery from 'jquery';
import { saveAs } from 'file-saver';

(function($) {
	$(document).ready(function() {
		$('body').on('click', 'a[download]', function(e) {
			let $this = $(this);
			let filename = $this.attr('download');
			let href = $this.attr('href');
			let regex = /^data:([^;]+);charset=([^\,]+)\,(.+)$/i;
			let matches = regex.exec(href);
			if(matches) {
				let type = matches[1];
				let charset = matches[2];
				let data = matches[3];
				e.preventDefault();
				let blob = new Blob([data], {type: type + ";charset=" + charset});
				saveAs(blob, filename);
			}
		});
	});
})(jQuery);
