import bind from 'bind-decorator';

export default class HotkeyManager {
	_hotkeyMap;

	constructor(hotkeyMap: { [key: string]: (arg0: KeyboardEvent) => void }) {
		this._hotkeyMap = Object.entries(hotkeyMap)
			.map(([hotkey, handler]) => {
				const [modifier, key] = hotkey.split('+');

				return {
					modifier: key && modifier,
					key: key ? key : modifier,
					handler
				};
			})
			.sort((a, b) => {
				if (a.modifier && b.modifier && a.key === b.key) {
					return a.modifier.localeCompare(b.modifier);
				}

				if (a.modifier && !b.modifier && a.key === b.key) {
					return -1;
				}

				if (!a.modifier && b.modifier && a.key === b.key) {
					return 1;
				}

				if (!a.modifier && !b.modifier) {
					return a.key.localeCompare(b.key);
				}

				return 1;
			});

		this.setup();
	}

	@bind
	private setup() {
		window.addEventListener?.('keydown', this.handler);
	}

	@bind
	public destroy() {
		window.removeEventListener?.('keydown', this.handler);
	}

	@bind
	private handler(e: KeyboardEvent) {
		this._hotkeyMap.every(({ key, modifier, handler }) => {
			if (e.key.toLowerCase() === key) {
				if (modifier) {
					if (modifier === 'shift' && e.shiftKey) {
						handler(e);
						return false;
					}
					if (modifier === 'alt' && e.altKey) {
						handler(e);
						return false;
					}
					if (modifier === 'ctrl' && e.ctrlKey) {
						handler(e);
						return false;
					}
					return true;
				} else {
					handler(e);
					return false;
				}
			}
			return true;
		});
	}
}
