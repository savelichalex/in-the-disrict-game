import Rx from 'rx';
import io from 'socket.io-client';

export function createSocketIODriver(url) {
	const socket = io(url);

	function get(eventName) {
		return Rx.Observable.create(observer => {
			function listener(message) {
				observer.onNext(message);
			}
			const sub = socket.on(eventName, listener);
			return function dispose() {
				sub.removeListener(eventName);
			};
		}).share();
	}

	function publish(messageType, message) {
		socket.emit(messageType, message);
	}

	return function socketIODriver(events$) {
		events$.forEach(event => publish(event.messageType, event.message));
		return {
			get,
			dispose: socket.destroy.bind(socket)
		}
	};
}