import Modal from "bootstrap/js/dist/modal";
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

export default defineNuxtPlugin((nuxtApp) => {

	return {
		provide: {
      Modal,
		},
	};
});