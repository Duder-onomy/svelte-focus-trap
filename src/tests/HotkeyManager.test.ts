import { describe, it, expect, test } from 'vitest';
import sinon from 'sinon';
import HotkeyManager from '$lib/HotkeyManager.js';

describe('Hotkey Manager Class', () => {
	it('will setup a listener and call a handler as provided by a config', () => {
		const handler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			z: handler
		});

		expect(handler.notCalled).to.be.true;

		const keyEvent = new KeyboardEvent('keydown', { key: 'z' });
		window.dispatchEvent(keyEvent);

		expect(handler.calledOnce).to.be.true;
		expect(handler.calledWith(keyEvent));

		hotkeyInstance.destroy();
	});

	it('will call nothing when given no matching keys', () => {
		const handler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			z: handler
		});

		expect(handler.notCalled).to.be.true;

		const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
		window.dispatchEvent(keyEvent);

		expect(handler.notCalled).to.be.true;

		hotkeyInstance.destroy();
	});

	it('can handle multiple hotkeys at once', () => {
		const zHandler = sinon.fake();
		const tabHandler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			z: zHandler,
			tab: tabHandler
		});

		expect(zHandler.notCalled).to.be.true;
		expect(tabHandler.notCalled).to.be.true;

		const zKeyEvent = new KeyboardEvent('keydown', { key: 'z' });
		window.dispatchEvent(zKeyEvent);

		expect(zHandler.calledOnce).to.be.true;
		expect(zHandler.calledWith(zKeyEvent)).to.be.true;

		expect(tabHandler.notCalled).to.be.true;

		const tabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
		window.dispatchEvent(tabKeyEvent);

		expect(zHandler.calledOnce).to.be.true;

		expect(tabHandler.calledOnce).to.be.true;
		expect(tabHandler.calledWith(tabKeyEvent));

		hotkeyInstance.destroy();
	});

	it('works with shift modifier', () => {
		const shiftTabHandler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			'shift+tab': shiftTabHandler
		});

		expect(shiftTabHandler.notCalled).to.be.true;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(shiftTabHandler.calledOnce).to.be.true;
		expect(shiftTabHandler.calledWith(shiftTabKeyEvent));

		hotkeyInstance.destroy();
	});

	it('works when there is a modifier AND a regular key of the same name', () => {
		const tabHandler = sinon.fake();
		const shiftTabHandler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			tab: tabHandler,
			'shift+tab': shiftTabHandler
		});
		expect(tabHandler.notCalled).to.be.true;
		expect(shiftTabHandler.notCalled).to.be.true;

		const tabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
		window.dispatchEvent(tabKeyEvent);

		expect(tabHandler.calledOnce).to.be.true;
		expect(tabHandler.calledWith(tabKeyEvent));

		expect(shiftTabHandler.notCalled).to.be.true;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(shiftTabHandler.calledOnce).to.be.true;
		expect(shiftTabHandler.calledWith(shiftTabKeyEvent));

		expect(tabHandler.calledOnce).to.be.true;

		hotkeyInstance.destroy();
	});

	test('works with alt key modifier', () => {
		const shiftTabHandler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			'alt+tab': shiftTabHandler
		});

		expect(shiftTabHandler.notCalled).to.be.true;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', altKey: true });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(shiftTabHandler.calledOnce).to.be.true;
		expect(shiftTabHandler.calledWith(shiftTabKeyEvent));

		hotkeyInstance.destroy();
	});

	test('works with ctrl key modifier', () => {
		const shiftTabHandler = sinon.fake();

		const hotkeyInstance = new HotkeyManager({
			'ctrl+tab': shiftTabHandler
		});

		expect(shiftTabHandler.notCalled).to.be.true;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', ctrlKey: true });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(shiftTabHandler.calledOnce).to.be.true;
		expect(shiftTabHandler.calledWith(shiftTabKeyEvent));

		hotkeyInstance.destroy();
	});
});
