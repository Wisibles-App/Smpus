// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
//   expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock matchMedia (not available in Jest/jsdom)
window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

// ─── Mock Capacitor Plugins ──────────────────────────────────────────────────
// Native plugins don't exist in CI Linux environment — mock them all.
jest.mock('@capacitor/push-notifications', () => ({
  PushNotifications: {
    requestPermissions: jest.fn().mockResolvedValue({ receive: 'granted' }),
    register: jest.fn().mockResolvedValue(undefined),
    addListener: jest.fn().mockResolvedValue({ remove: jest.fn() }),
    removeAllListeners: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@capacitor-community/fcm', () => ({
  FCM: {
    subscribeTo: jest.fn().mockResolvedValue(undefined),
    unsubscribeFrom: jest.fn().mockResolvedValue(undefined),
    getToken: jest.fn().mockResolvedValue({ token: 'mock-token' }),
    deleteInstance: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@capacitor/app', () => ({
  App: {
    addListener: jest.fn().mockResolvedValue({ remove: jest.fn() }),
    removeAllListeners: jest.fn().mockResolvedValue(undefined),
    getInfo: jest.fn().mockResolvedValue({ version: '1.0', build: '1' }),
    getState: jest.fn().mockResolvedValue({ isActive: true }),
  },
}));

jest.mock('@capacitor/status-bar', () => ({
  StatusBar: {
    setStyle: jest.fn().mockResolvedValue(undefined),
    setBackgroundColor: jest.fn().mockResolvedValue(undefined),
    show: jest.fn().mockResolvedValue(undefined),
    hide: jest.fn().mockResolvedValue(undefined),
  },
  Style: { Dark: 'DARK', Light: 'LIGHT', Default: 'DEFAULT' },
}));

jest.mock('@capacitor/keyboard', () => ({
  Keyboard: {
    addListener: jest.fn().mockResolvedValue({ remove: jest.fn() }),
    removeAllListeners: jest.fn().mockResolvedValue(undefined),
    setResizeMode: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@capawesome/capacitor-app-update', () => ({
  AppUpdate: {
    getAppUpdateInfo: jest.fn().mockResolvedValue({}),
    performImmediateUpdate: jest.fn().mockResolvedValue(undefined),
    startFlexibleUpdate: jest.fn().mockResolvedValue(undefined),
    completeFlexibleUpdate: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock('@capacitor/browser', () => ({
  Browser: {
    open: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    addListener: jest.fn().mockResolvedValue({ remove: jest.fn() }),
  },
}));
